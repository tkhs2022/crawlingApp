import socket
import pickle
import connect
import sys

ip_address = '127.0.0.1'
port = 7010
buffer_size = 2048

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    print('server.py start...')

    try:
        # IPアドレスとPortの割り当て
        s.bind((ip_address, port))
        s.listen(1)

        #  クライアントからのデータ送信を待機
        while True:
            # 要求があれば接続確立する。アドレスを代入。
            conn, addr = s.accept()
            # 受信したデータを代入
            data = conn.recv(buffer_size)
            # 受診したバイト型を復元する
            data = pickle.loads(data)

            if data['pass'] == 99:
                conn.sendall(bytes("coreected.", 'utf-8'))
                print('connection established.')
                print('data: {}, addr: {}'.format(data, addr))
                print('crawling tool starating...')
                # クローリングプログラム実行
                connect.main()
                print('crawling tool finished...')

            else:
                conn.sendall(bytes("incoreected.", 'utf-8'))

    except KeyboardInterrupt as e:
        print('KeyboardInterrupt occurred...continue??(y/n)')
        your_cmd = input('>> ')
        if your_cmd == 'y':
            pass
        elif your_cmd == 'n':
            print('sys.exit(0)')
            sys.exit(0)
