#!/bin/bash

wget http://ftp.gnu.org/gnu/glibc/glibc-2.18.tar.gz
tar zxvf glibc-2.18.tar.gz
cd glibc-2.18
mkdir build
cd build
../configure --prefix=/opt/glibc-2.18
make -j4
sudo make install
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/glibc-2.18/lib