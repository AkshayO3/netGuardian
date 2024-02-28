def remove_backslashes(text):
    lines = text.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)


def secureAccessProtocols(file):
    warning = set()
    with open(file, 'r') as file:
        for line in file:
            if line.startswith('tftp-server'):
                warning.add(f"tftp {line}")
            elif line.startswith('ip ftp'):
                warning.add(f"ftp {line}")
            elif line.startswith('ip http'):
                warning.add(f"http {line}")
        if len(warning) > 0:
            return f"Severity:2\nInsecure access protocol in lines -->\n{''.join(warning)}"


def check_insecure_snmp(file):
    lines = []
    with open(file, 'r') as file:
        for line in file:
            if line.startswith('snmp-server'):
                parts = line.strip().split()
                if parts[-2] in ['v3 noauth', 'v1', 'v2c']:
                    lines.append(f"Insecure SNMP configuration: {line.strip()}")
                else:
                    if parts[1] == "community":
                        if parts[-2] == 'public':
                            lines.append(f"Insecure SNMP configuration: {line.strip()}")
    text = remove_backslashes("\n".join(lines))
    if len(text)>0:
        return f"Severity:2\nInsecure SNMP access detected --> \n{text}"