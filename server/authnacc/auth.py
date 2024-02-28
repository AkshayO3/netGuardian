import re
def remove_backslashes(text):
    lines = text.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)


def check_users(file):
    user_count = 0
    usernames=[]
    with open(file, 'r') as file:
        for line in file:
            if line.strip().startswith('username'):
                usernames.append(line.split()[1])
                user_count += 1
        if user_count >= 3:
            return f"Severity:2\nDescription:Too many users present --> {user_count}, Found {usernames}"




def is_weak_password(password):
    if len(password) < 8:
        return True
    if not re.search(r'[A-Z]', password) or \
            not re.search(r'[a-z]', password) or \
            not re.search(r'[0-9]', password) or \
            not re.search(r'[!@#$%^&*()_+{}|:"<>?~\-\[\]\\;\'`,./]', password):
        return True
    if re.search(r'(.)\1{2,}', password):
        return True
    if re.search(r'123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210', password):
        return True
    return False

def check_weak_passwords(file):
    weaks = []
    with open(file, 'r') as file:
        for line in file:
            if line.strip().startswith('username'):
                parts = line.strip().split()
                if len(parts) >= 4:
                    username = parts[1]
                    password = parts[-1] if len(parts) > 4 else ""
                    if is_weak_password(password):
                        weaks.append(f"Weak password for user {username}: {password}")


def missing_configurationPassword(file):
    found = False
    with open(file, 'r') as file:
        for line in file:
            if line.startswith('enable password'):
                found = True
                password = line.split()[2]
        if found:
            if is_weak_password(password):
                return "Severity:1\nConfiguration password is weak."
        else:
            return ("Severity:1\nConfiguration password not found.")


def check_host_authentication(file):
    interface_up = True
    authentication_enabled = False
    interface_name = ''

    with open(file, 'r') as file:
        list = []
        for line in file:
            line = line.strip()
            if line.startswith('interface'):
                if interface_up and not authentication_enabled and interface_name:
                    list.append(f"Missing host authentication on access port: {interface_name}")
                interface_name = line.split()[1]
                interface_up = True
                authentication_enabled = False
            elif line == 'shutdown':
                interface_up = False
            elif line == 'dot1x pae authenticator':
                authentication_enabled = True
        if interface_up and not authentication_enabled and interface_name:
            list.append(f"Missing host authentication on access port: {interface_name}")
    final =  "\n".join(list)
    return f"Severity:1\n{remove_backslashes(final)}"


def port_security(config_file_path, num):   # Max mac addresses are assumed to be 4
    list = []
    desc = 1
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data = config_data.replace("!         \\", "")
        blocks = config_data.split("!\\")
        for x in blocks:
            x = x.strip()
            xlines = x.splitlines()
            if x.lstrip().startswith("interface"):
                if "shutdown" not in x:
                    if "switchport port-security" not in x:
                        list.append(f"Does not contain port security:{xlines[0]}")
                    for y in xlines:
                        y = y.lstrip()
                        if y.startswith('switchport port-security maximum'):
                            parts = y.split()
                            if len(parts) >= 4:
                                desc = 2
                                max = int(parts[3].strip("\\"))
                            if max > num:
                                list.append(f"Number of mac addresses configured on switch are more than what is "
                                            f"specified:{xlines[0]}")
    final = "\n".join(list)
    return f"Severity:{desc}\nDescription:\n{remove_backslashes(final)}"


