#!/bin/bash

input=$(ls ~/Pictures | sort -R | head -n 1)
x=$(hyprctl cursorpos | awk '{print $1}' | sed 's/,//g')
x=$(($x-1920))
y=$(hyprctl cursorpos | awk '{print $2}')
y=$((1080-($y-1080)))
swww img ~/Pictures/"$input" --transition-type grow --transition-pos $x,$y 

