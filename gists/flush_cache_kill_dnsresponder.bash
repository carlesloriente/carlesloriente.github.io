#!/bin/bash

sudo dscacheutil -flushcache;
sudo killall -HUP mDNSResponder;
sleep 2;
