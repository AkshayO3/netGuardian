def check_weak_encryption(file):
    weak_encryption_algorithms = ['des', '3des', 'rc2', 'rc4', 'md5', 'sha-1', 'wep', 'ssl 2.0', 'ssl 3.0', 'tls 1.0',
                                  'tls 1.1', 'pptp']
    weaks = []
    with open(file, 'r') as file:
        for line in file:
            line = line.lower()  # Convert line to lowercase
            words = line.split()  # Split line into words
            for algorithm in weak_encryption_algorithms:
                if algorithm in words:
                    weaks.append(f"Weak encryption algorithm found: {algorithm}")
    text = "\n".join(weaks)
    if text:
        return f"Severity:2\n{text}"