from copyreg import pickle
import os
import socket
import platform
import pickle
import os
import subprocess
from sys import stdout

ip_address = '127.0.0.1'
port = 7010
buffer_size = 2048

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    ########################################################
    # ソケットに送信するデータ
    # OS version
    os_info = platform.system() + platform.release()
    # hostname
    host_name = socket.gethostname()
    # IP address
    ip = socket.gethostname()
    # UserName
    user_name = os.getlogin()
    ########################################################

    # connect
    s.connect((ip_address, port))
    # data
    data = {"os_info": os_info, "host_name": host_name, "ip": ip, "user_name":user_name, "pass": 99}
    data = pickle.dumps(data)
    s.sendall(bytes(data))
    # recieve
    data = s.recv(buffer_size)
    print(data.decode())

