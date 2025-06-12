#!/bin/bash

input=$(ls -t ~/Pictures | rofi -dmenu -p "pick a pape")

x=$(hyprctl cursorpos | awk '{print $1}' | sed 's/,//g')
x=$(($x-1920))
y=$(hyprctl cursorpos | awk '{print $2}')
y=$((1080-($y-1080)))

swww img ~/Pictures/"$input" --resize fit --transition-type grow --transition-pos $x,$y 
touch ~/Pictures/"$input"
