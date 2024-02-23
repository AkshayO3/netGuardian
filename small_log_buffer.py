#13

def remove_backslashes(lines):
    lines = lines.splitlines()
    clean_lines = [line.rstrip("\\") for line in lines]
    return "\n".join(clean_lines)

def check_logging_buffer_size(config_file_path, threshold):
    with open(config_file_path, 'r') as file:
        config_data = file.read()
        report=False
        list=[]

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
    if report:      
        final="\n".join(list)
        return f"Severity:3\n{remove_backslashes(final)}"

# Example usage:
config_file_path = r"conf_2034.rtf"
threshold = 1000000
x=check_logging_buffer_size(config_file_path, threshold)
if x:
    print(x)
