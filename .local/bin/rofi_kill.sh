#!/bin/bash
input=$(ps aux | awk '{print $2, $11}' | rofi -dmenu -p "kill a program")
kill $input
