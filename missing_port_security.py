#10
def port_security(config_file_path,num):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data=config_data.replace("!         \\","")
        
        blocks=config_data.split("!\\")
        for x in blocks:
            x=x.strip()
            xlines=x.splitlines()
            if x.lstrip().startswith("interface"):
                if (("shutdown" not in x)):
                    if ("switchport port-security" not in x):
                        print("Do not contain port security: ",xlines[0])
                        print()
                    for y in xlines:
                        y=y.lstrip()
                        if y.startswith('switchport port-security maximum'):
                            parts = y.split()
                            if len(parts) >= 4:
                                max = int(parts[3].strip("\\"))
                            if (max>num):
                                print(" number_of_mac_addresses configured on switch are more than what is specified: ",xlines[0])
                                print()                       

port_security("conf_2038.rtf",4)