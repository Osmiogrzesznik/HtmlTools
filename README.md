demo running live on:
https://osmiogrzesznik.github.io/HtmlTools/TrumpfGcodeLSTDuplicateCheck.html
[graphical](https://osmiogrzesznik.github.io/HtmlTools/inconsistencyCheck.html)
##What it does:

Really simple program that reads program file
and finds overlaying cutting paths
shows line numbers with duplicated coordinates
by searching for identical X,Y,Z combinations

it does not modify the file,
it does not upload it anywhere,
it just reads the lines of text inside
everything is computed on the local computer that browses the HTML
no external dependencies or installing

#1.Select your file
#2. Program simply prints out pairs :
original line number and
the duplicated coordinates line number. e.g.:
'Line N4350 is duplicated on line N56750'

#3. TESTED on 4Mb .LST File
#4. TESTED on 8Mb(10) : takes 1s (8MB file with N reaching N499990....)

##TO DO IN THE FUTURE:
- sort the duplicate pairs by N numbers!!!
- Group the N numbers if whole paths are found to occupy identical coordinates
	and then print out only duplicated range
	(e.g. lines N1230-N2480 are duplicated on lines N9950-N10540)
- Print the block number for groups
- Gradually show new duplicates that were found, so user don't have to wait if file is really big, (run tests on big program files)
- identify evaporation cycles
	A- identify inside/outside cut (possibly as separate program, may be slower)
	-A1 NOTE 1 : if given a template of one correct part Human supervised (copy paste from first blocks, basically)
	it may be easier to identify incorrect order without slow geometrical algorithms

NOTE TO SELF:

KISS - Keep it simple, stupid
