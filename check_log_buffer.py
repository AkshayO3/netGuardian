#1 2
def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)

def check_missing_syslog(config_file_path):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        list=[]

        if 'logging host' not in config_data:
            list.append("SysLog reporting is missing.")
    final =  "\n".join(list)
    return f"Severity:2\n{remove_backslashes(final)}"

# Example usage:
config_file_path = "conf_2034.rtf"
x=check_missing_syslog(config_file_path)
if x:
    print(x)
