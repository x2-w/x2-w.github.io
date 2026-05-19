## Table Of Contents

### Programming Language

- [C Programming Language]()

### Operating System

- [os](./os/contents.md)



# WiFi Driver Architecture

下面是 WiFi 驱动架构：

```mindmap
WiFi
  PHY
    OFDM
    CCK
    LDPC

  MAC
    Association
    Authentication
    Roaming

  Driver
    cfg80211
    mac80211
    vendor command

  Firmware
    MCU
    Calibration
```

> [!TIP]
> 点击节点左侧的小三角可以折叠/展开子节点；滚动可以缩放; 拖动画布可以平移
