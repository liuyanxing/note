### 基础概念

AVFormatContext: 表示容器，通过读取容器头设置

AVStream：音视频流，保存在AVFormatContext中

AVPacket：一段未解码的音视频数据（推测为包含一个关键帧的group）

AVCodec：编解码器

AVFrame：解码后的frame



### 解码流程

```c
// 生成一个AVFormatContext, AVFormatContext表示容器信息
AVFormatContext *pFormatContext = avformat_alloc_context();

// 打开一个文件，将文件信息传入AVFormatContext
avformat_open_input(&pFormatContext, filename, NULL, NULL);

// 获取流信息，将流信息传入AVFormatContext
avformat_find_stream_info(pFormatContext,  NULL);
// 遍历流
for (int i = 0; i < pFormatContext->nb_streams; i++)
{
  pFormatContext->streams[i];
}
// 获取流的编码信息
AVCodecParameters *pCodecParameters = pFormatContext->streams[i]->codecpar;

// 根据流编码信息获取编解码器
AVCodec *pCodec = avcodec_find_decoder(pLocalCodecParameters->codec_id);

// 根据编解码器分配一个编解码上下文，并通过流的信息设置上下文
// 设置完成后打开编解码器
AVCodecContext *pCodecContext = avcodec_alloc_context3(pCodec);
avcodec_parameters_to_context(pCodecContext, pCodecParameters);
avcodec_open2(pCodecContext, pCodec, NULL);

// 分配一个packet，将文件数据读入packet
AVPacket *pPacket = av_packet_alloc();
while (av_read_frame(pFormatContext, pPacket) >= 0) {
  //...
}
// 将packet传入解码器
avcodec_send_packet(pCodecContext, pPacket);

// 创建一个AVFrame，并接受解码器的结果
avcodec_receive_frame(pCodecContext, pFrame);

```



### 同步音视频

DTS: 解码时间，因为B帧依赖前后的帧，所以解码时间和显示时间不一致

PTS: 显示时间



#### PTS计算

Fps：帧率

Timebase: 时间基，表示每个刻度是多少秒

Pts: 占有多少个刻度

