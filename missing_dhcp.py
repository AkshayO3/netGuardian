#11

def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)

def missing_dhcp(config_file_path):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data = config_data.replace("!         \\","")
        list=[]
        
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
    final =  "\n".join(list)
    return f"Severity:2\n{remove_backslashes(final)}"


print(missing_dhcp("conf_2038.rtf"))
print()
