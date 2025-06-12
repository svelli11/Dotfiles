#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

force_color_prompt=yes

if [ -f ~/.bash_aliases ]; then
. ~/.bash_aliases
fi
alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '
export PATH="~/Games:$PATH"
export PS1="\[\e[01;33m\]\u\[\e[0m\]\[\e[00;37m\]@\[\e[0m\]\[\e[01;36m\]\h\[\e[0m\]\[\e[00;37m\] \t \[\e[0m\]\[\e[01;35m\]\w\[\e[0m\]\[\e[01;37m\] \[\e[0m\]\n$ "
export PATH=/home/svel/.local/bin:~/Games:~/Games:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl
export MANPAGER="vim -M +MANPAGER --not-a-term -"
