## download qemu

```bash
wget https://download.qemu.org/qemu-11.0.1.tar.xz
```

## decompress

```bash
tar xvJf qemu-11.0.1.tar.xz
```

## configure

```bash

cd qemu-11.0.1.tar.xz

mkdir build

cd build

../configure \
    --target-list=aarch64-linux-user arm-linux-user riscv32-linux-user riscv64-linux-user x86_64-linux-user aarch64-softmmu arm-softmmu i386-softmmu riscv32-softmmu riscv64-softmmu x86_64-softmmu \
    --enable-debug \
    --enable-debug-info \
    --enable-debug-tcg \
    --enable-trace-backends=log \
    --disable-strip
```

## compiling

```bash
make -j8
```