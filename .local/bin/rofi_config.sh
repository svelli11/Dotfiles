#!/bin/bash

#theres a better way to do this
#open files with extensions in vim
#open any folder


input=$(echo -e "hyprland\nbinds\n.config\nscripts\ndotfiles" | rofi -dmenu -p "select a folder or file")

directory="/home/svel"

#function that opens files with vim or goes deeper into directories with rofi
#use this function in a wallpaper chooser, or something similar with ags
choose() {

directory+="/$1"

if [[ -f "$directory" ]] ; then
       kitty bash -c "vim $directory"
elif [[ -d "$directory" ]] ; then	
	input=$(ls -t $directory | rofi -dmenu)
	choose $input
else
	echo wtf
fi

}

case $input in
	hyprland) kitty bash -c 'cd ~/.config/hypr && vim hyprland.conf; exec bash' ;;

	binds) kitty bash -c 'cd ~/.config/hypr && vim binds.conf; exec bash' ;;

	.config) input=$(ls -t ~/.config | rofi -dmenu -p "select a config folder")
		choose ".config/$input" ;;

	scripts) input=$(ls -t ~/.local/bin | grep .sh| rofi -dmenu -p "select a script")
		choose ".local/bin/$input" ;;

	dotfiles) input=$(ls -a  ~ | grep '^\.' | sed 1,2d | rofi -dmenu -p "select a folder")
		choose $input ;;
esac

