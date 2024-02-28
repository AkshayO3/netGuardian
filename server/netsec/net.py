def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)


def control_plane(file):
    found = False
    with open(file, 'r') as file:
        for line in file:
            if line.strip().startswith('control-plane'):
                found = True
        if not found:
            return "Control-plane missing"



def storm_control(config_file_path):
    list = []
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data = config_data.replace("!         \\", "")
        blocks = config_data.split("!\\")
        for x in blocks:
            x = x.strip()
            if x.lstrip().startswith("interface"):
                if (("shutdown" not in x)):
                    if (("storm-control multicast" not in x) and ("storm-control unicast" not in x)):
                        xword = x.splitlines()
                        list.append(f"Missing Storm Control on access ports --> {remove_backslashes(xword[0])})")
    final = "\n".join(list)
    return f"Severity:2\nDescription:\n{final}"


def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)


def missing_dhcp(config_file_path):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data = config_data.replace("!         \\", "")
        list = []

        dhcp_snoop = False
        blocks = config_data.split("!\\")

        for block in blocks:
            block_lines = block.split('\n')
            interface_name = None
            vlan_id = None

            for line in block_lines:
                if line.strip().startswith("ip dhcp snooping"):
                    dhcp_snoop = True
                elif line.strip().startswith("interface"):
                    interface_name = line.split()[1]
                elif line.strip().startswith("switchport access vlan"):
                    vlan_id = line.split()[3]

            if interface_name and vlan_id:
                if not dhcp_snoop:
                    list.append(f"DHCP snooping is missing on interface {interface_name} with VLAN {vlan_id}")
    final = "\n".join(list)
    return f"Severity:2\n{remove_backslashes(final)}"


def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)


def check_missing_syslog(config_file_path):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        list = []

        if 'logging host' not in config_data:
            list.append("SysLog reporting is missing.")
    final = "\n".join(list)
    if (len(list) > 0):
        return f"Severity:2\n{remove_backslashes(final)}"


def check_logging_buffer_size(config_file_path, threshold):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        report = False
        list = []

        buffer_size = None
        lines = config_data.split("\n")
        for line in lines:
            if line.startswith('logging buffered'):
                parts = line.split()
                if len(parts) >= 3:
                    buffer_size = int(parts[2].strip("\\"))
                break

        if buffer_size is not None and buffer_size < threshold:
            list.append(f"Logging buffer size ({buffer_size}) is smaller than the threshold ({threshold}).")
            report = True
    if report:
        final = "\n".join(list)
        return f"Severity:3\n{remove_backslashes(final)}"


