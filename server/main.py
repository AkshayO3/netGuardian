import encryption.enc
import authnacc.auth
import netsec.net
import prosec.pro
import re

from datetime import datetime
file = input()

def generate_report(file):
    file = file
    content = []

    oneWarnings = 0
    twoWarnings = 0
    threeWarnings = 0


    def hostname(file):
        with open(file, 'r') as file:
            for line in file:
                if line.startswith('hostname'):
                    return (line.split()[1].strip('\\'))


    def sevCheck(num):
        nonlocal oneWarnings, twoWarnings, threeWarnings
        if num == 1:
            oneWarnings += 1
        elif num == 2:
            twoWarnings += 1
        else:
            threeWarnings += 1


    if (authnacc.auth.check_users(file)):
        content.append(authnacc.auth.check_users(file))
        content.append("\n")
        sevCheck(int(authnacc.auth.check_users(file)[9:10]))

    if (authnacc.auth.check_weak_passwords(file)):
        content.append(authnacc.auth.check_weak_passwords(file))
        content.append("\n")
        sevCheck(int(authnacc.auth.check_weak_passwords(file)[9:10]))

    if (authnacc.auth.missing_configurationPassword(file)):
        content.append(authnacc.auth.missing_configurationPassword(file))
        content.append("\n")
        sevCheck(int(authnacc.auth.missing_configurationPassword(file)[9:10]))

    if (prosec.pro.secureAccessProtocols(file)):
        content.append(prosec.pro.secureAccessProtocols(file))
        content.append("\n")
        sevCheck(int(prosec.pro.secureAccessProtocols(file)[9:10]))

    if (prosec.pro.check_insecure_snmp(file)):
        content.append(prosec.pro.check_insecure_snmp(file))
        content.append("\n")
        sevCheck(int(prosec.pro.check_insecure_snmp(file)[9:10]))

    if (encryption.enc.check_weak_encryption(file)):
        content.append(encryption.enc.check_weak_encryption(file))
        content.append("\n")
        sevCheck(int(encryption.enc.check_weak_encryption(file)[9:10]))

    if (authnacc.auth.check_host_authentication(file)):
        content.append(authnacc.auth.check_host_authentication(file))
        content.append("\n")
        sevCheck(int(authnacc.auth.check_host_authentication(file)[9:10]))

    if netsec.net.control_plane(file):
        content.append(netsec.net.control_plane(file))
        content.append("\n")
        sevCheck(int(netsec.net.control_plane(file)[9:10]))

    if (netsec.net.storm_control(file)):
        content.append(netsec.net.storm_control(file))
        content.append("\n")
        sevCheck(int(netsec.net.storm_control(file)[9:10]))

    if (authnacc.auth.port_security(file, 4)):
        content.append(authnacc.auth.port_security(file, 4))
        content.append("\n")
        sevCheck(int(authnacc.auth.port_security(file, 4)[9:10]))

    if (netsec.net.missing_dhcp(file)):
        content.append(netsec.net.missing_dhcp(file))
        content.append("\n")
        sevCheck(int(netsec.net.missing_dhcp(file)[9:10]))

    if (netsec.net.check_missing_syslog(file)):
        content.append(netsec.net.check_missing_syslog(file))
        content.append("\n")
        sevCheck(int(netsec.net.check_missing_syslog(file)[9:10]))

    if (netsec.net.check_logging_buffer_size(file, 10000)):
        content.append(netsec.net.check_logging_buffer_size(file, 10000))
        sevCheck(int(netsec.net.check_logging_buffer_size(file, 10000)[9:10]))
    final = '\n'.join(content)
    return (
        f"Device name: {hostname(file)}\n"
        f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-7]}\n"
        f"Number of Severity 1 findings: {oneWarnings}\n"
        f"Number of Severity 2 findings: {twoWarnings}\n"
        f"Number of Severity 3 findings: {threeWarnings}\n\n"
        f"{final}"
        f"\n\n=========================== End of Report ================================== "
    )


def extract_highest_severity(report):
    lines = report.split('\n')
    highest_severity = None
    for line in lines:
        match = re.match(r'Number of Severity (\d) findings: (\d+)', line)
        if match:
            severity = int(match.group(1))
            findings = int(match.group(2))

            if findings > 0 and (highest_severity is None or severity > highest_severity):
                highest_severity = severity
    return highest_severity


def extract_device_name(report):
    match = re.search(r'Device name: (.*)', report)
    if match:
        return match.group(1)
    else:
        return None

print(generate_report(file))
print(extract_highest_severity(generate_report(file)))
print(extract_device_name(generate_report(file)))