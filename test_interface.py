#9
def interface_block(config_file_path):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        config_data=config_data.replace("!         \\","")
        
        blocks=config_data.split("!\\")
        for x in blocks:
            x=x.strip()
            
            if x.lstrip().startswith("interface"):
                if (("shutdown" not in x)):
                    if (("storm-control multicast" not in x) and("storm-control unicast" not in x)):
                        xword=x.splitlines()
                        print(xword[0])
                        print()

interface_block("conf_2034.rtf")
        