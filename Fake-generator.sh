days=200
total_commit=100
size=$((days*24*60))
a=$(shuf -i 1-$size -n $total_commit | sort -r -n)

for i in ${a}
do 
git commit --allow-empty -m "commit "
git commit --amend --allow-empty --no-edit --date "$(date -d "-$i minutes")"
done 
git checkout master