fileName=$1
n=$( cat $1|wc -l )
if (( $n%2!=0 ))
then
	n=$(( $n+1 ))
fi
n=$(( $n/2 ))
tail -n +$n $1|head -n 1
