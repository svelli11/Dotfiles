#!/bin/bash


################################################################################
# __  ____   __  _____ ___ ____  ____ _____   ____   ____ ____  ___ ____ _____ #
#|  \/  \ \ / / |  ___|_ _|  _ \/ ___|_   _| / ___| / ___|  _ \|_ _|  _ \_   _|#
#| |\/| |\ V /  | |_   | || |_) \___ \ | |   \___ \| |   | |_) || || |_) || |  #
#| |  | | | |   |  _|  | ||  _ < ___) || |    ___) | |___|  _ < | ||  __/ | |  #
#|_|  |_| |_|   |_|   |___|_| \_\____/ |_|   |____/ \____|_| \_\___|_|    |_|  #
#									       #
################################################################################

#echo this is a test bitch, who are you? 

#read input

#echo come with me, $input

#case "$input" in
#	"fart") echo "ewwww wtffff" ;;
#	"hawk") echo "tuah" ;;
#esac
#if grep -q "1"then....

#input=$(echo -e "google\nspotify\nnemo\nwebcord" | rofi -dmenu -p "what to open...")
#
#case $input in
#	"google") exec floorp ;;
#	"spotify") exec spotify ;;
#	"nemo") exec nemo ;;
#	"webcord") exec webcord ;;
#esac


input=$(ls -t ~/Pictures | rofi -dmenu -p "pick a pape")
x=$(hyprctl cursorpos | awk '{print $1}' | sed 's/,//g')
x=$(($x-1920))
y=$(hyprctl cursorpos | awk '{print $2}')
y=$((1080-($y-1080)))
swww img ~/Pictures/"$input" --transition-type grow --transition-pos $x,$y 
touch ~/Pictures/"$input"
