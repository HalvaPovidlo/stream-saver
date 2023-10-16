import os

import ffmpeg
import streamlink


from datetime import datetime

import sys

data = sys.argv[1]


def download_stream(channel_url):
    streams = streamlink.streams(channel_url)
    if len(streams) == 0:
        return 0
    fd = streams["best"].open()

    # Название стримера из URL (пример: "https://www.twitch.tv/streamer1" -> "streamer1")
    streamer_name = channel_url.split("/")[-1]





    path = os.path.join(os.getcwd(),"static", "videos", f"{streamer_name}")
    if not os.path.exists(path):
        os.makedirs(path)
    i = 1

    # Имя файла для сохранения стрима
    time = datetime.now()
    output_file = f"{streamer_name}({time.strftime('%m-%d-%Y'):})"

    # Находим свободное имя если файл уже существует
    while os.path.isfile(os.path.join(path, output_file+f'({i})'+".mp4")):
        i += 1
    output = os.path.join(path, os.path.join(path, output_file+f'({i})'+".ts"))

    output = os.path.normpath(output)
    f = open(output, "wb")

    while True:
        # Чтение данных из стрима
        data = fd.read(1024)
        if not data:
            break
        # Запись данных в файл
        f.write(data)
        # Закрываем файл и стрим после окончания записи

    fd.close()
    f.close()
    next_output = os.path.join(path, output_file+f'({i})'+'.mp4')
    ffmpeg.input(output).output(next_output, vcodec='copy', acodec='copy', format='mp4', movflags='faststart').run(
        overwrite_output=True)
    print(next_output)
    os.remove(output)


channel_url = data
download_stream(channel_url)
