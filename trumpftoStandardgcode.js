time_Start = 0;
textFromFileLoaded = ''
_ = null;
/* my tools to make development on mobile phone easier*/
window.onerror = (...x) => {
    x[2] = x[2] - 8;
    console.error(x);
}
cur = {}
say = console.log
glb_show_points = false

sa = x => say(x);
say(2)
p = x => tout.innerText += x
p2 = x => tout.innerText = x
pl = x => p(x + "\n")
as = (...x) => x.join('')
ap = (...x) => p(as(...x))
apl = (...x) => pl(as(...x))


reportsAr = []
report = (...x) => reportsAr.push(x.join('') + "\n")


function metablock_select_set(blocks, boolA) {
    blocks.select = boolA
    blocks.isMetaBlock = true;
    blocks.forEach(block => {
        block.isBlock = true;
        Block_select_set(block, boolA)
    })
    blockselection = blocks
    return blockselection
}

function Block_select_set(block, boolA) {
    block.select = boolA;
    block.isBlock = true;
    blockselection = block
    block.forEach(s => {
        s.select = boolA;
    })

}



function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function removeItems(arr, values) {
    values.forEach(value => {

        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
    })

}





const BGcolors = ['transparent', 'white']
curBGindex = 0;
curCanvasBG = BGcolors[curBGindex];

const colorON = 'rgba(0,0,0,1)';
const colorOFF = 'rgba(100,100,100,0.3)';
const colorMarkEvap = 'rgba(0,0,255,.7)';
const colorSelected = 'rgba(0,255,0,1)';

const colorUnknownCMD = 'rgba(160,0,175,1)';
const colorUnknownCMDSemi = 'rgba(0,0,155,0.5)';

const GM_EVAP = 5
const GM_CUT = 1
const GM_OFF = 0



// but you have to make two lines from it:
// example:
// CIP I1 = 1 J1 = 2 x = 3 y = 4
// to ==>          G01 x = 1 y = 2
//    \==>         G01 x = 3 y = 4                            
// N320 G01 X = 320.61 Y = -472.76 Z = 291.18 B = -10.00 C = -90.00
// N330 CIP I1 = 318.04 J1 = -491.94 K1 = 294.56 X = 327.12 Y = -472.76 Z = 291.18 B = -10.00 C = -90.00

//these have no on and off th
// N470 R1 = 490.00 R2 = 1870.75 R3 = -207.00 R4 = 0.00 R5 = 0.00 R11 = 0.00 R26 = 12.00
// N480 TC_CIRC2(6.85,3.42,0.50,9,10,100,"ST030MDN2X-0")
//     
// N1890; LEAD_IN_END
// N1900 R1 = 556.88 R2 = 1819.14 R3 = -207.00 R4 = 0.00 R5 = 0.00 R9 = -0.00 R11 = 0.00 R26 = 12.00
// N1910 TC_RECT2(2.29,0.65,0.00,1.15,0.50,9,10,500,"ST030MDN2X-0")
// TC_STARTPOS2(388.83, 1329.83, -194.00, 0.00, 0.00, 1.00)
bbox = null;
cachedoffsSections = null;
TC_OBLONG2 = 0

const TC_ = 'TC_'
const TC_n = -1
const G_ = "G0"
const CIP = 'CIP'
const CIPn = 5
const R = "R"
const OTHER = "OTHER"
const LABEL = "LABEL"

const TC_RECT2 = 'TC_RECT2' //put a star on last params
const TC_RECT2n = -11; //put a star on last params
const TC_CIRC2 = 'TC_CIRC2'
const TC_STARTPOS2 = 'TC_STARTPOS2'
const TC_CIRC2n = 6;
const BLOCK_START = 'BLOCK_START'
const BLOCK_STARTn = -1000



const NOT_OFFSETABLE_CMDS = {
    TC_,
    TC_CIRC2,
    TC_RECT2,
    BLOCK_START,
    OTHER,
    LABEL,
    // TC_STARTPOS2
    // R //TODO R1 , R2, R3 are actually offsetable
}


const NOT_DRAW_IMPLEMENTED = {
    TC_,
    TC_RECT2,
    BLOCK_START,
    TC_STARTPOS2,
    LABEL,
    OTHER
}

const DO_NOT_DRAW = {
    BLOCK_START,

    LABEL,
    OTHER
}



const TC_LASER_ON = 'TC_LASER_ON'
const END_OF_HEADER = "END_OF_HEADER";
const END_OF_PROGRAM = "END_OF_PROGRAM";
const START_TEXT = 'START_TEXT';
const END_TEXT = 'END_TEXT';
const Xcmd = "X = ";
const Ycmd = "Y = ";
const I1cmd = "I1 = ";
const J1cmd = "J1 = ";
const K1cmd = "K1 = ";



const TK = {
    discardAfter: ";",
}

// Create canvas element
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
//TODO scale to bounding box
//scale to 

// Define initial pen position
var StartparamsSet = false;
var global_simulation_repeater = null;
pen = {}
global_simulation_interval = 1

cur.x = 0
cur.y = 0
cur.n = null;
cur.global_points = []
var ctx_scl = 8;
var currentLineWidth = 0.5;




function getBetween(gcln, cmd1, cmd2, curV) {
    let iStart = gcln.indexOf(cmd1) + cmd1.length
    let iEnd = cmd2 ? gcln.indexOf(cmd2) - 1 : gcln.length;
    strv = gcln.substring(iStart, iEnd)
    Numv = parseFloat(strv);
    if (isNaN(Numv)) {
        say(strv)
        if (strv.startsWith("IC(")) {
            nv = parseFloat(strv.substring(3, strv.length - 1));
            return curV + nv
        }
    }
    return Numv;
}



function groupSectionsInBlocks(sar) {
    let blocks = [];
    // object instead of array?
    lastBind = -1;
    for (let i = 0; i < sar.length; i++) {
        let s = sar[i];

        if (s.typ === BLOCK_START) {

            lastBind++;
            blocks[lastBind] = [s]
            blocks[lastBind]._B = s.B
            blocks[lastBind].isBlock = true;


            continue;
        }
        if (s.typ === OTHER) {
            // say(s)
        }
        // say(s)
        if (lastBind < 0) {
            // alert("movement before first block!")
            continue
        }
        blocks[lastBind].push(s)
    }
    blocks.forEach((b, i) => {
        b.orig_i = i
    })
    return blocks;
    //get bounding box by block
}

function splitByMetablock(metablock1, blocks) {

    if (!metablock1.length) throw Error("empty metablock1")
    let howMany = blocks.length / metablock1.length
    if (Math.floor(howMany) != howMany) {
        report("Initial check- Remainder on division - amount of Blocks is not multiple of original!")
    }
    metablocks = []
    for (i = 0; i <= howMany; i++) {
        mb = blocks.slice(metablock1.length * i, metablock1.length * (i + 1))
        if (mb.length) {
            mb.isMetaBlock = true;
            metablocks.push(mb)
        }
    }
    return metablocks;
}




function findFirstWrongBlock() {}



function findRepeatingSequenceInBlocks(bs) {
    let rememberedLengths = []
    let rememberedBlocks = []
    /*
    patrz na polowe arraya i druga polowe jak sa takie same 
    to masz powtorzenie
    */
    for (let i = 0; i < bs.length; i++) {
        let b = bs[i];
        l = b.length;
        rememberedLengths.push(l)
        rememberedBlocks.push(b)
        // console.log("length of rememberedLengths", rememberedLengths.length, rememberedLengths)
        // console.log("length of rememberedBlocks", rememberedBlocks.length, rememberedBlocks)
        if (rememberedLengths.length != 0 && rememberedLengths.length % 2) continue;
        let halves = sliceArrayInHalf(rememberedLengths)

        if (!halves) continue;

        let lengthsRepeat = arrayEqualsArray(halves[0], halves[1], (e1, e2) => e1 == e2)

        if (!lengthsRepeat) continue;

        // lengths repeat - now compare if elements repeat

        halves = sliceArrayInHalf(rememberedBlocks)
        blocksRepeat = arrayEqualsArray(halves[0], halves[1], areBlocksOffsetIdentical_not_y)

        if (!blocksRepeat) continue;
        return halves[0]

    }
    return false;
}

function checkMetablockConsistency(origMeta, metablocks) {
    let bools = []
    let wrongMetablockIndices = []
    let wrongMetablocks = [];
    let errormetablockTMPL = {
        Metablock: null,
        index: null,
        errorblocks: []
    }
    metablocks.forEach((mb, i) => {
        let bool = arrayEqualsArray(origMeta, mb, areBlocksOffsetIdentical_not_y)
        bools.push(bool)
        if (!bool) {
            wrongMetablockIndices.push(i)
            wrongMetablocks.push(mb)
            report("inconsistency on ", i + 1, " metablock/part ")
        }
    })
    say(wrongMetablockIndices)

    wrongMetablocks.forEach((wmb, i) => {
        //find first wrong block
        let wmbi = wrongMetablockIndices[i]
        let reports = []
        let anyblockwrong = false
        let booldefinFalse = arrayEqualsArray(origMeta, wmb, (borig, bcopy, i_in_metablock) => {

            let bcopyOK = areBlocksOffsetIdentical_not_y(borig, bcopy)
            if (!bcopyOK) {
                anyblockwrong = true
                let msg = [i_in_metablock, " block in part", wmbi + 1, " incosistent! block_no:", bcopy[0].B].join(" ")

                bcopy.forEach(s => {
                    s.bad = true;
                    s.color = "rgba(255,0,0,0.3)"
                    s.tags = {
                        order: i_in_metablock,
                        wrongBlock: true,
                    }
                })
                let bcs = bcopy[0]
                bcs.bad = true;
                bcs.color = "rgba(255,0,0,1)"
                bcs.tags = {
                    order: i_in_metablock,
                    wrongBlock: true,
                }

                //say(msg)
                report(msg)
            }
            return true; //bcopyOK;

        })

    })

}
//TODO renumber blocks to normal simple script before
// TODO inconsistent with what part(metablock orig) in report
// TODO rect and other Tc-circ may have virtual points for bbox calc
function Bbox1SmallerThanBBox2(bbx1, bbx2) {
    let b1 = bbx1.rangeX < bbx2.rangeX
    let b2 = bbx1.rangeY < bbx2.rangeY
    return b1 && b2
}

function Bbox1SimilarSizeBBox2(bbx1, bbx2, tolerance) {
    let b1 = FloatEqualsTolerance(bbx1.rangeX, bbx2.rangeX, tolerance)
    let b2 = FloatEqualsTolerance(bbx1.rangeX, bbx2.rangeX, tolerance)
    return b1 && b2
}

function Bbox1SameSizeBBox2(bbx1, bbx2) {
    let b1 = bbx1.rangeX == bbx2.rangeX
    let b2 = bbx1.rangeY == bbx2.rangeY
    return b1 && b2
}

function BBox1InBBox2(bbx1, bbx2) {
    if (!Bbox1SmallerThanBBox2(bbx1, bbx2)) return false;
    let b1 = bbx1.minX > bbx2.minX
    let b2 = bbx1.minY > bbx2.minY
    return b1 && b2
}


function FloatEqualsTolerance(a, b, tolerance) {
    return (Math.abs(a - b) < tolerance)
}



//TODO inconsistency check may use cached bboxes for similarity 




function findBiggestBboxesAndTheirIndices(blocks) {
    // TODO try to find only two identical and the indei1cal distance is your metablock length
    // then you can use that known length to discover the second metablock 
    profilesAndIndices = []
    biggest_sofar_BB_I = 0;
    revSortedBig = [];
    blocks.forEach((block, i) => {
        let bboxn = calcBoundBox(block, s => s.onoffevap !== 0)
        //checking inside wont work between biggest unless smaller kicks in

        if (i == 0) {
            biggest_sofar_BB_I = {
                bboxn,
                i
            };

            return;
        }
        let bboxBig = biggest_sofar_BB_I.bboxn
        let nSmallerThanB = Bbox1SmallerThanBBox2(bboxn, bboxBig)
        let BsmallerThan_n = Bbox1SmallerThanBBox2(bboxBig, bboxn)
        let BBsf_I = biggest_sofar_BB_I.i;
        // let nSameSizeB = Bbox1SameSizeBBox2(bboxn, bboxBig)
        let nSameSizeB = Bbox1SimilarSizeBBox2(bboxn, bboxBig, tolerance)

        // let abob = {
        //     nSmallerThanB,
        //     BsmallerThan_n,
        //     nSameSizeB
        // }
        // let ab1 = Object.entries(abob);

        // let abstl = ab1.map(x => [x[0], x[1] & x[1]]).flat().join(' ')
        // say(i, BBsf_I)
        // say(abstl)
        if (!nSmallerThanB && BsmallerThan_n) { // this already excludes bbx1==bbx2
            //certainly N is bigger than B
            biggest_sofar_BB_I = {
                bboxn,
                i
            };
            return;
        }
        if (nSameSizeB) {
            IndB = biggest_sofar_BB_I.i
            profilesAndIndices[0] = {
                block: blocks[IndB],
                i: IndB
            }
            profilesAndIndices.push({
                block: blocks[i],
                i: i
            })
        }
        //you need to check if one is evap ? optional user defined
    })
    say({
        biggest_sofar_BB_I,
        profilesAndIndices,
    })
    let biggestblock = blocks[biggest_sofar_BB_I.i]
    // similarblocks = blocks.filter(b => b.bbox)
    profiles = profilesAndIndices
    if (profiles.length) return profiles
    profiles = [{
        block: biggestblock,
        i: biggest_sofar_BB_I[1]
    }]
    return profiles

    //TODO finish this- this is improved metablock search
    // TODO select by metablocks
    //if after all that we have the repeating profile blocks empty
    //it means there is one part only in the program

    // TODO add optional trimoff to each program
    // TODO it always knows where last parts finish
    // TODO just simple int TrimAftercut-2 Trimnow -1 nottrim -0
    // TODO same with move away , auto added 



}

function areBlocksOffsetIdentical_not_y(b1, b2, i) {
    boolSectionsIdenticalApartYdim = arrayEqualsArray(b1, b2, areSectionsIdenticalApartYoffset)
    return boolSectionsIdenticalApartYdim
    // block series
    //TODO
    // TODO teraz kazda roznica pomiedzy pozycjami y powinna byc identyczna(pozostala edge
    // TODO     case jesli czesci maja wszystko takie samo ale jakos pozmieniane w y(rzaaaadkie))
    // TODO now
    // TODO for each few
    // TODO ysectiondiffs1 = (b1[1].params.y - b1[0].params.y)
    // TODO ysectiondiffs2 = (b1[1].params.y - b1[0].params.y)
    // TODO to be equal
    // TODO if typ is offsetable(meaning has Y and X)
    // TODO now
    // TODO for each few b1[0]
    //if typ is offsetable(meaning has Y and X)
}

function areSectionsIdenticalApartYoffset(s1, s2, i) {
    // block series

    if (!s1.typ == s2.typ) return false;
    if (!s1.onoffevap == s2.onoffevap) return false;
    if (s1.typ == TC_) {
        if (!s1.gc == s2.gc) return false;
    } else if (s1.typ == CIP) {
        let p1 = s1.params
        let p2 = s2.params
        if (!p1.x == p2.x) return false;
        if (!p1.i1 == p2.i1) return false;
    } else if (s1.typ == G_) {
        let p1 = s1.params
        let p2 = s2.params
        if (!p1.x == p2.x) return false;

    } else if (s1.typ == TC_RECT2) {
        if (!s1.gc == s2.gc) return false;

    } else if (s1.typ == TC_CIRC2) {
        if (!s1.gc == s2.gc) return false;


    }
    return true
}

function arrayEqualsArray(a1, a2, elemequalselemfunc) {

    if (a1.length != 0 && a1.length != a2.length) return false;

    let bools = []
    for (let i = 0; i < a1.length; i++) {
        let a1_e = a1[i]
        let a2_e = a2[i]
        let bool = elemequalselemfunc(a1_e, a2_e, i)
        if (!bool) return false;
    }

    return true;
}

function sliceArrayInHalf(ar) {
    if (ar.length == 2 || ar.length == 0 || ar.length % 2) return false;
    let len = ar.length;
    let halflen = len / 2;

    let halflenindex = Math.floor(halflen)

    let half = ar.slice(0, halflenindex)
    let half2 = ar.slice(halflenindex, ar.length)
    // let halfstr = half.join("")
    // let half2str = half2.join("")
    // say(len)
    // say(halfstr)
    // say(half2str)
    // say({
    //     halflen,
    //     halflenindex,
    //     halfstr,
    //     half2str
    // })
    return [half, half2]
}

function ReverseAllProgramBlocksAndRenumberEverything(AllProgramblocks) {
    // fof blocks
    // if (block.select)[optional]
    // return AllProgramblocks.map(b => say(b));
    AllProgramblocks.reverse()
    AllProgramblocks = RenumberProgram(AllProgramblocks);
    swal.fire("reversed")
    return AllProgramblocks;
}

function RenumberProgram(AllProgramblocks) {
    // fof blocks
    // if (block.select)[optional]
    // return AllProgramblocks.map(b => say(b));

    let nuB = 1;
    let nuN = 1;
    AllProgramblocks.forEach((block, i) => {

        block.forEach(s => {

            s.B = nuB;
            s.N = nuN++;
        })
        block._B = nuB;
        nuB++;
    })
    swal.fire("Renumbered")
    return AllProgramblocks;
}

function switchBlocksInPlace() {}

function outputGcode(blocks) {
    //TODO 
    // trnsform line by line
    // careful! mske sure all references - no caching
    // and array copies
    sections = blocks.flat();
    lines = sections.map(sectionToGcode)
    return lines.join("")
}

function renumberSections(sectionsOrBlpcks) {
    let sections = sectionsOrBlpcks[1].hasOwnProperty("N") ?
        sectionsOrBlpcks : sectionsOrBlpcks.flat();
    nuN = 1;
    sections.forEach(s => {
        s.N = nuN++;
    })

}



function getlineNo(gcl, cur) {
    let indEnd = -1;
    if (!gcl.startsWith("N")) {
        cur.n = null;
        return null;
        return cur.n ? cur.n : cur.n++
    }

    indEnd = gcl.indexOf(";")
    if (indEnd < 0) {
        indEnd = gcl.indexOf(" ")
        if (indEnd < 0) {
            console.warn("N line number finish malformed at lines following ", cur.n, '\n',
                gcl)
            cur.n = null;
            return null
        }
    }
    // indEnd = 1
    let Nstr = gcl.substring(1, indEnd - 1)
    cur.n = parseInt(Nstr)
    return {
        n: cur.n,
        indEnd: indEnd - 1
    };
    //can save all info that i want now as second item in the first array
    //BLock number etc. i can make sequence that has no params and is ignored by maths later
}





function getNextAssignment_Name_Value_nexti(gcln, fromIndex, assignmentToken = " = ") {
    if (fromIndex === null) {
        throw Error("Bbb :no null allowed to prevent infinite loop")
    }
    gcln = gcln.trim()
    let iAssignmentToken = gcln.indexOf(assignmentToken, fromIndex);
    if (iAssignmentToken < 0) return false;
    //let NameAssgSeqString = gcln.substring(fromIndex, iAssignmentToken)
    let minnumvallen = 2
    //let iNameAssgSeqStart = gcln.indexOf(NameAssgSeqString, fromIndex); //search for "Rxx = " after fromIndex
    /* Below: even if we searched for vaild
     "Name = " the below line finds first space after start of "Name = " namely "Name|= " where | is index
     by search for next ' ' after already start index  of this sequence
    */
    //let iNameAssgSeqEnd = gcln.indexOf(" ", iNameAssgSeqStart);
    let NameString = gcln.substring(fromIndex, iAssignmentToken);

    let iValStart = iAssignmentToken + assignmentToken.length; // iVal start jumps over the " = "
    let iEnd = gcln.indexOf(" ", iValStart + 1); //search for next ' ' after start of numeric value(min one digit) 
    if (iEnd < 0) {
        iEnd = gcln.length //we cannot find next ' ' -> numeric value ends the line
    }
    let strv = gcln.substring(iValStart, iEnd);
    let ob = {
        n: NameString.toLowerCase(),
        strv: strv,
        nexti: iEnd === gcln.length ? null : iEnd + 1, //return null if we reached string end, else return last index (1 to jump over the space)
    }
    return ob
}

function getAllVars(gcln, startIndex = 0, cur, lineNumber) {
    let paramsR = {};
    let nexti = startIndex
    for (let ci = 0; ci <= gcln.length && nexti !== null; ci += 4) {
        let t1 = getNextAssignment_Name_Value_nexti(gcln, nexti)

        nexti = t1.nexti;
        let numv = parseFloat(t1.strv);
        if (isNaN(numv)) {
            console.error('NaN in dunamic params not sure what to do(dict with cur for IC() ?) line:', gcln)
            if (t1.strv.startsWith("IC(")) {
                let nv = parseFloat(t1.strv.substring(3, t1.strv.length - 1));
                say(t1.n, nv)
                if (t1.n in cur) {

                    let curV = cur[t1.n]
                    say("is in cur")
                    numv = curV + nv
                    say("lineNo", lineNumber, "var", t1.n, "is in cur:", cur[t1.n], "after adding:", numv)
                }
            }
        }
        paramsR[t1.n] = numv

    }
    // if (debug) say(paramsR)
    return paramsR
}


function addSection(cur, typ, onoffevapState, params, gcl, cmdstr) {
    let hadLineNo = cur.n !== null;
    let ob = {
        typ: typ,
        onoffevap: onoffevapState,
        params: params,
        N: cur.n,
        hadN: hadLineNo,
        B: cur.bln,
        gc: gcl,
        cmdstr: cmdstr,
    }
    if (Object.values(params).some(isNaN)) {
        console.error(cur.n, "NOT stopping but line with NaN", [typ, params, cur.n, gcl])
    }
    Object.keys(cur).forEach(keyString => {
        if (keyString in params) {
            cur[keyString] = params[keyString]
        }
    })
    cur.global_points.push(ob)

    return ob
}






function interpretGCode(gCode, global_points) {
    const gCodeArray = gCode.split(/\r?\n/);
    let cur = {
        global_points: global_points,
        x: 0,
        y: 0,
        z: 0,
        n: 0,
        bln: 0,
    }



    let GmodalState = 0;

    for (let i = 0; i < gCodeArray.length; i++) {

        let gcln = gCodeArray[i];
        if (!gcln) {
            console.warn(`No N number for line counting from ${END_OF_HEADER}`, {
                i,
                gcln
            })
            continue
        }
        //discard N number aand discard after Z

        lineNumber = getlineNo(gcln, cur);
        let noN = lineNumber === null;

        let startSearch = noN ? 0 : lineNumber.indEnd + 1
        // TODO find if  ";" or " " is first

        let nextspaceIndex = gcln.indexOf(" ", startSearch - 1)
        let nextsemicolonIndex = gcln.indexOf(";", startSearch - 1)
        if (nextspaceIndex < 0 && nextsemicolonIndex < 0) {
            if (gcln.trim().endsWith(":")) {
                addSection(cur, LABEL, GmodalState, {}, gcln)
            }
            // console.error("Malformed line (no spaces or semicolons) near or after N", cur.N, " gc:", gcln)
            continue;
        }


        gcln = gcln.substring(startSearch, gcln.length).trim();
        // console.log(gcln)
        //teraz typy
        blockStartInd = gcln.indexOf(BLOCK_START)

        if (blockStartInd >= 0) {
            let bniend = gcln.indexOf(" =", blockStartInd + BLOCK_START.length)

            block_no = gcln.substring(blockStartInd + BLOCK_START.length, bniend)
            block_no = parseInt(block_no)
            // console.log(block_no, gcln)
            cur.bln = block_no
            addSection(cur, BLOCK_START, GmodalState, {
                block_no
            }, gcln)
            // addSection(cur,[GmodalState, GmodalState], [x, y], gcln)
            // cur.x = x;
            // cur.y = y;
        } else if (gcln.startsWith(TC_STARTPOS2)) { //// TODO TC_CIRCLE.cmd
            //// TODO TC_CIRCLE.len
            paramsstr = gcln.substring(TC_STARTPOS2.length + 1, gcln.length - 1).split(',', 6);
            let paramsar = paramsstr.map(parseFloat)
            let [x, y, z, b, c, correction] = paramsar;
            let paramsob = {
                x,
                y,
                z,
                b,
                c,
                correction
            };
            if (paramsar.some(isNaN)) {
                //TODO create IC( AC( procedure that can be called quickly
                throw Error(["possible IC() AC() in parameters! not yet supported !", cur.n, paramsob, gcln].join(" "))
                console.warn(cur.n, "possible IC()")
            }
            say("Startpos2 found", lineNumber)
            arrr = addSection(cur, TC_STARTPOS2, 0, paramsob, gcln)
            //keep it simple
            //draw a star (ctx.text or smth)
        } else if (gcln.startsWith(CIP)) {
            let paramsCIP = getAllVars(gcln, CIP.length + 1, cur, lineNumber)
            // TODO pozniej optymizuj czukaj indexu raz getBetween powtarza czynnosc
            arrr = addSection(cur, CIP, GmodalState, paramsCIP, gcln)
            // addSection(cur,GmodalState, [x2, y2], gcln)

        } else if (gcln.startsWith(G_)) {
            let istartforvars = gcln.indexOf(' ', G_.length)
            let cmdstr = gcln.substring(0, istartforvars)
            // say(cmdstr)
            if (istartforvars < 0) throw alert(cur.n + " N no normal Gcode need some space;)")
            let params = getAllVars(gcln, istartforvars + 1, cur, lineNumber)

            addSection(cur, G_, GmodalState, params, gcln, cmdstr)

        } else if (gcln.startsWith(TC_LASER_ON)) {

            paramsstr = gcln.substring(TC_LASER_ON.length + 1, gcln.length - 1).split(',', 6);

            let kerf = paramsstr[3];
            let cutsevapsorwhat = {
                '100': 1,
                '500': 2,
                '400': 2,
                '200': 1,
                '300': 1
            } [kerf]
            // TODO GET here first number
            // console.log("ON--------------------------------------------------------ON")
            GmodalState = cutsevapsorwhat;
            addSection(cur, OTHER, GmodalState, {}, gcln)
        } else if (gcln.startsWith('TC_LASER_OFF')) {
            GmodalState = 0;
            addSection(cur, OTHER, GmodalState, {}, gcln)
            // console.log("OFF------------------------------------------------------OFF")
        } else if (gcln.startsWith(TC_CIRC2)) { //// TODO TC_CIRCLE.cmd
            //// TODO TC_CIRCLE.len
            paramsstr = gcln.substring(TC_CIRC2.length + 1, gcln.length - 1).split(',', 6);
            let paramsar = paramsstr.map(parseFloat)
            let [diam, r, entry, mode, unknown, kerf] = paramsar;
            let paramsob = {
                diam,
                r,
                entry,
                mode,
                unknown,
                kerf
            };
            let cutsevapsorwhat = {
                '100': 1,
                '500': 2,
                '400': 2,
                '200': 1,
                '300': 1
            } [kerf]


            /*
            N95900 G01 X = 548.74 Y = 730.06 Z = -197.00 B = 0.00 C = 0.00 F = 173000
            N95920 R1 = 548.74 R2 = 730.06 R3 = -207.00 R4 = 0.00 R5 = 0.00 R11 = 0.00 R26 = 12.00
            N95930 TC_CIRC2(5.86, 2.93, 0.50, 9, 10, 100, "ST020MDN2X-0")
            Czyli zawsze cur.x i cur.y(pozostale z ostatniej linii)
            */
            if (paramsar.some(isNaN)) {
                //TODO create IC( AC( procedure that can be called quickly
                throw Error(["possible IC() AC() in parameters! not yet supported !", cur.n, paramsob, gcln].join(" "))
                console.warn(cur.n, "possible IC()")
            }
            //TODO with this you can collect all weird parameters for better 
            //duplicatecheck
            arrr = addSection(cur, TC_CIRC2, cutsevapsorwhat, paramsob, gcln)

            //keep it simple
            //draw a star (ctx.text or smth)
        } else if (gcln.startsWith(TC_RECT2)) { //// TODO TC_CIRCLE.cmd
            //// TODO TC_CIRCLE.len
            paramsstr = gcln.substring(TC_RECT2.length + 1, gcln.length - 1).split(',', 8);
            let paramsar = paramsstr.map(parseFloat)
            let [sideX, sideY, _p2_, _p3_, _p4_] = paramsar;
            let kerf = paramsstr[7];
            // TC_RECT 2 has rounded edges _pp2_ p3 etc are for this purpose
            // console.log(TC_RECT2, kerf, gcln)
            let paramsob = {
                sideX,
                sideY,
                _p2_,
                _p3_,
                _p4_,
            }
            let cutsevapsorwhat = {
                '100': 1,
                '500': 2,
                '400': 2,
                '200': 1,
                '300': 1
            } [kerf]

            /*
            
            Czyli zawsze cur.x i cur.y(pozostale z ostatniej linii)
            */
            if (paramsar.some(isNaN)) {
                //TODO create IC( AC( procedure that can be called quickly
                throw Error(["possible IC() AC() in parameters! not yet supported !", cur.n, params, gcln].join(" "))
                console.warn(cur.n, "possible IC()")
            }
            //TODO with this you can collect all weird parameters for better 
            //duplicatecheck
            arrr = addSection(cur, TC_RECT2, cutsevapsorwhat, paramsob, gcln)

            //keep it simple
            //draw a star (ctx.text or smth)
        } else if (gcln.startsWith(TC_)) {
            idfhsj = gcln.indexOf("(")
            let cmd = gcln.substring(0, idfhsj);
            let paramsstr = gcln.substring(idfhsj + 1, gcln.length - 1).split(',', 8);
            console.log(cmd)

            addSection(cur, TC_, GmodalState, {
                cmd: cmd,
                paramsstr: paramsstr
            }, gcln)

            //keep it simple
            //draw a star (ctx.text or smth)
        } else if (gcln.startsWith(R)) {

            let Rparams = getAllVars(gcln, 0, cur, lineNumber)
            /*
                
            R1 = 548.74 R2 = 1854.13 R3 = -207.00 R4 = 0.00 R5 = 0.00 R11 = 0.00 R26 = 12.00

            */


            // TODO pozniej optymizuj czukaj indexu raz getBetween powtarza czynnosc

            arrr = addSection(cur, R, GmodalState, Rparams, gcln)
            // addSection(cur,GmodalState, [x2, y2], gcln)
            // cur.x = x;
            // cur.y = y;

        } else if (!gcln.length) {
            //empty line do nothing
        } else {
            addSection(cur, OTHER, GmodalState, {}, gcln)
        }
    }
    return cur.global_points;
}

function sectionToGcode(s) {
    xr = /X = [+-]?\d+(\.\d+)?/
    yr = /Y = [+-]?\d+(\.\d+)?/
    i1r = /I1 = [+-]?\d+(\.\d+)?/
    j1r = /J1 = [+-]?\d+(\.\d+)?/
    r1r = /R1 = [+-]?\d+(\.\d+)?/
    r2r = /R2 = [+-]?\d+(\.\d+)?/

    let l = ''
    //for now only works for reversing and reordering (KISS first then do complex)
    l += s.hadN ? `N${s.N}0 ` : '';
    if (s.typ in NOT_OFFSETABLE_CMDS) {
        if (s.typ === BLOCK_START) {
            l += `;==================== BLOCK_START ${s.B} ===============`
        } else if (s.typ === LABEL) {
            l += `BLOCK_${s.B}:`
        } else {
            l += s.gc
        }
    } else {
        if (s.typ === G_) {

            // l += s.cmdstr
            l += s.gc.replace(xr, "X = " + s.params.x.toFixed(2))
                .replace(yr, "Y = " + s.params.y.toFixed(2))
        } else if (s.typ === CIP) {

            // l += "CIP "
            l += s.gc.replace(xr, "X = " + s.params.x.toFixed(2))
                .replace(yr, "Y = " + s.params.y.toFixed(2))
                .replace(i1r, "I1 = " + s.params.i1.toFixed(2))
                .replace(j1r, "J1 = " + s.params.j1.toFixed(2))
        } else if (s.typ === R) {


            l += s.gc.replace(r1r, "R1 = " + s.params.r1.toFixed(2))
                .replace(r2r, "R2 = " + s.params.r2.toFixed(2))

        } else {
            l += s.gc
        }
    }
    say(s.gc)
    say(l)
    l += '\n'
    return l

}



//TODO print how many parts if metablocks fpund
function getNumericCode_str_repr(sections) {
    return sections.map(getSection_str_repr).join("\n");
}

function getSection_str_repr(s) {
    let paramsRepr = Object.entries(s.params).flat().join(" ")
    x = Object.assign({}, s)
    x.params = paramsRepr
    return Object.entries(x).flat().join(" ")
}



function calcBoundBox(sections, filterfunc) {
    // if (sections.bbox) return sections.bbox;
    //TODO what about CIP and i and j (these are usually outside points)
    let i1s = []
    let j1s = []
    let ys = sections.map(s => {
        if (filterfunc && !filterfunc(s)) return NaN;
        if (s.typ in NOT_OFFSETABLE_CMDS) return NaN;
        if (s.typ === CIP) j1s.push(s.params.j1)
        return s.params.y
    })
    let xs = sections.map(s => {
        if (filterfunc && !filterfunc(s)) return NaN;
        if (s.typ in NOT_OFFSETABLE_CMDS) return NaN;
        if (s.typ === CIP) i1s.push(s.params.i1)
        return s.params.x
    })

    xs = xs.filter(x => !isNaN(x))
    ys = ys.filter(y => !isNaN(y))
    // say(xs, filterfunc)
    ys = ys.concat(j1s)
    xs = xs.concat(i1s)

    maxX = Math.max(...xs)

    maxY = Math.max(...ys)
    minX = Math.min(...xs)
    minY = Math.min(...ys)
    rangeX = maxX - minX;
    rangeY = maxY - minY;
    let bbx = {
        minX,
        minY,
        maxX,
        maxY,
        rangeX,
        rangeY
    }

    sections.bbox = bbx;
    return bbx;
}

function translateBlockCopy(b, offsetVector) {
    let nub = b.map(s => translateSection(s, offsetVector))
    nub.isBlock = true;
    return nub;
}

function translateBlock(b, offsetVector) {
    b = b.map(s => translateSection(s, offsetVector))
}



function translateSection(s, offsetVector) {
    if (s.typ in NOT_OFFSETABLE_CMDS) return s;
    let nus = JSON.parse(JSON.stringify(s))
    let nups = nus.params;
    say(nus)
    nups.select = false;
    nus.B = null;
    nus.N = null;

    let olps = s.params
    nups.x = olps.x + offsetVector.x;
    nups.y = olps.y + offsetVector.y;
    if (s.typ === CIP) { // TODO TC_CIRCLE.typ
        nups.i1 = olps.i1 + offsetVector.x;
        nups.j1 = olps.j1 + offsetVector.y;
    }
    if (s.typ === R) { // TODO TC_CIRCLE.typ
        nups.r1 = olps.r1 + offsetVector.x;
        nups.r2 = olps.r2 + offsetVector.y;
    }
    // let nus = Obj  ect.assign({}, s)
    nus.params = nups;
    return nus;
}

function mirrorSection(s) {
    //TODO
    throw Error("unimplemented")
}

function prepForDrawing(sections) {
    let offsSections;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = BGcolors[curBGindex];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // if (!cachedoffsSections) {
    //     recalculate = true
    // }
    // if (recalculate) {
    let {
        minX,
        minY,
        maxX,
        maxY,
        rangeX,
        rangeY
    } = calcBoundBox(sections)
    //for info only

    //prepare points by offseting them to their mins 


    offsSections = sections.map(s => {
        if (s.typ in NOT_OFFSETABLE_CMDS) return s;
        let nups = {}
        let olps = s.params
        nups.x = (olps.x - minX + (currentLineWidth)) * -1;
        nups.y = (olps.y - maxY - (currentLineWidth)) * 1;
        if (s.typ === CIP) { // TODO TC_CIRCLE.typ
            nups.i1 = (olps.i1 - minX + (currentLineWidth)) * -1;
            nups.j1 = (olps.j1 - maxY - (currentLineWidth)) * 1;
        }
        let nus = Object.assign({}, s)
        nus.params = nups;
        return nus;
    })
    cachedoffsSections = offsSections;


    canvas.width = (rangeX * ctx_scl) + (currentLineWidth * ctx_scl * 2);
    canvas.height = (rangeY * ctx_scl) + (currentLineWidth * ctx_scl * 2);

    ctx.scale(-ctx_scl, -ctx_scl)
    obforhum = {
        "minX:": minX.toFixed(2),
        "minY:": minY.toFixed(2),
        "sizeX:": rangeX.toFixed(2),
        "sizeY:": rangeY.toFixed(2),
        "maxX:": maxX.toFixed(2),
        "maxY:": maxY.toFixed(2),
    }
    say(obforhum)
    global_font_size = 2 * ctx_scl
    ctx.fillStyle = "black";
    ctx.lineWidth = currentLineWidth / ctx_scl / 2;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = (global_font_size / ctx_scl) + "px sans-serif";
    // let towrite = Object.entries(obforhum).forEach((xx, i) => {
    //     let towrite = xx.flat().join("\n");
    //     ctx.fillText(towrite, (-canvas.width / ctx_scl) + 2, (-canvas.height / ctx_scl + 2) + global_font_size / ctx_scl * i);

    // })
    // say(towrite)


    console.log(bbox)

    ctx.setLineDash([2, 2])
    ctx.lineWidth = currentLineWidth;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "6px sans-serif";
    return offsSections
}

function drawFromPoints(inputsections, recalculate) {

    let sections = inputsections[0].N ? inputsections : inputsections.flat()

    offsSections = prepForDrawing(sections)


    offsSections.map(s => drawSection(s, pen));

}

function drawFromBlocksSIM(inputsections, recalculate) {

    let sections = inputsections[0].N ? inputsections : inputsections.flat()
    //TODO here check inputsections etc or make REDRAW func separately
    offsSections = prepForDrawing(sections)
    let blocks = groupSectionsInBlocks(offsSections)
    if (global_simulation_repeater !== null) {
        global_simulation_repeater.stop()
        global_simulation_repeater = null;
    }
    global_simulation_repeater = new TimeoutRepeater(blocks, drawBlockSIM, blocks.length, onFinishedSIM)
    pen = {}
    global_simulation_repeater.pen = pen
    // offsSections.map(s => drawSection(s, pen));
    global_simulation_repeater.start()
}

function drawFromSectionsSIM(inputsections, recalculate) {

    let sections = inputsections[0].N ? inputsections : inputsections.flat()

    offsSections = prepForDrawing(sections)

    if (global_simulation_repeater !== null) {
        global_simulation_repeater.stop()
        global_simulation_repeater = null;
    }
    global_simulation_repeater = new TimeoutRepeater(offsSections, drawSectionSIM, offsSections.length, onFinishedSIM)
    pen = {}
    global_simulation_repeater.pen = pen
    // offsSections.map(s => drawSection(s, pen));
    global_simulation_repeater.start()
}

function drawBlockSIM(reptob) {
    let block = reptob.arrayData[reptob.global_index]
    let pen = reptob.pen
    let section = block[0]
    aaaNNO.innerText = section.N
    aaaBNO.innerText = section.B
    block.map(section => drawSection(section, pen))

    return true;
}

function drawSectionSIM(reptob) {
    let section = reptob.arrayData[reptob.global_index]
    let pen = reptob.pen
    aaaNNO.innerText = section.N
    aaaBNO.innerText = section.B
    drawSection(section, pen)
    return true;
}


function onFinishedSIM(reptob) {

}

function TimeoutRepeater(arrayData, somefunc, indexmax, onFinish) {
    this.somefunc = somefunc
    this.onFinish = onFinish
    this.arrayData = arrayData
    this.global_index = 0;
    this.global_indexmax = indexmax;
    this.timeoutID = null;
    this.running = false;
    // this.interval = interval
}

TimeoutRepeater.prototype.start = function () {
    if (this.timeoutID !== null) {
        return console.error("nonerror: timeoutRepeater alreadyRunning")
    }
    this.running = true;
    this.timeoutID = setTimeout(this.repeat.bind(this));
}

TimeoutRepeater.prototype.stop = function () {
    this.running = false;
    clearTimeout(this.timeoutID)
    // alert("stopped!")
}

TimeoutRepeater.prototype.repeat = function () {
    if (!this.running) return;
    let self = this
    if (this.global_index >= this.global_indexmax) return this.onFinish(self);


    if (!this.somefunc(self)) {
        return;
    }
    this.global_index++;
    // console.log(ig);
    stIDdodo = setTimeout(this.repeat.bind(this), global_simulation_interval);

}


/*
Blindman67
https://stackoverflow.com/questions/62550460/how-to-draw-a-curve-that-passes-three-points-in-canvas
*/
function fitCircleToPoints(x1, y1, x2, y2, x3, y3) {
    var x, y, u;
    const slopeA = (x2 - x1) / (y1 - y2); // slope of vector from point 1 to 2
    const slopeB = (x3 - x2) / (y2 - y3); // slope of vector from point 2 to 3
    if (slopeA === slopeB) {
        return
    } // Slopes are same thus 3 points form striaght line. No circle can fit.
    if (y1 === y2) { // special case with points 1 and 2 have same y 
        x = ((x1 + x2) / 2);
        y = slopeB * x + (((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2));
    } else if (y2 === y3) { // special case with points 2 and 3 have same y 
        x = ((x2 + x3) / 2);
        y = slopeA * x + (((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2));
    } else {
        x = ((((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2)) - (u = ((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2))) / (slopeA - slopeB);
        y = slopeA * x + u;
    }

    return {
        x,
        y,
        radius: ((x1 - x) ** 2 + (y1 - y) ** 2) ** 0.5,
        CCW: ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) >= 0,
    };
}

const dashON = []
const dashOFF = [2, 2]
const dashMarkEvap = [0.2, 0.33, 0.1];

const dashStyles = [
    dashOFF,
    dashON,
    dashMarkEvap
]
const strokeStyles = [
    colorOFF,
    colorON,
    colorMarkEvap
]

function getStrokeStyle(onoffevap, typ) {
    return strokeStyles[onoffevap];
}

function getDashStyle(onoffevap, typ) {
    return dashStyles[onoffevap]
}

function drawSection(section, pen) {
    //TODO maybe here isBLock and call self recursively for each of subarrays
    let s = section
    let typ = s.typ
    if (glb_show_points) {
        ctx.fillStyle = "rgba(205,0,205)"
        ctx.fillRect(pen.x - .3, pen.y - .3, .6, .6)
    }
    let GmodalState = s.onoffevap
    let params = s.params
    let x = params.x;
    let y = params.y;


    if (typ in DO_NOT_DRAW) {
        if (typ = BLOCK_START) {
            ctx.font = "3px sans-serif";
            ctx.fillStyle = s.select ? colorSelected : s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;
            if (s.bad && s.tags) {
                ctx.fillText(s.tags.order + "", pen.x - 7, pen.y);
            }

            // console.log(s.onoffevap)

        }
        return
    }
    if (s.typ == TC_STARTPOS2) {
        ctx.font = "3px sans-serif";
        ctx.fillText("STARTPOS2", pen.x, pen.y + currentLineWidth * 7);

    } else if (typ == G_) {
        // console.log(s.N)
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        // say(s.onoffevap, s.N, s.gc)
        window.sssss = s
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.moveTo(pen.x, pen.y);
        ctx.lineTo(x, y);
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.stroke();
        pen.x = x;
        pen.y = y;
    } else if (typ == TC_RECT2) {
        ctx.setLineDash([1, 2, 0.5])
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap)
        ctx.fillStyle = s.select ? colorSelected : s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;

        // ctx.font = "10px sans-serif";
        // ctx.fillText("+", pen.x, pen.y);
        ctx.font = "3px sans-serif";
        ctx.fillText("TC_RECT2-WIP", pen.x, pen.y + currentLineWidth * 7);
        // console.log(s.onoffevap)
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        let cx = pen.x
        let cy = pen.y

        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.rect(pen.x - params.sideX, pen.y - params.sideY, params.sideX, params.sideY);
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.stroke();

    } else if (typ == TC_CIRC2) {
        // console.log(s.onoffevap)
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        let cx = pen.x
        let cy = pen.y
        let r = params.r
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 360, false);
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.stroke();

    } else if (typ == CIP) {
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        // console.log(s)
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        let i1 = params.i1
        let j1 = params.j1

        let circle = fitCircleToPoints(pen.x, pen.y, i1, j1, x, y);
        // let circle = fitCircleToPoints(pen.x, pen.y, points[2], points[3], points[4], points[5]);
        if (!circle) {
            say("not possible to draw this CIP", s.N, s.gc)
            return;
        }
        const ang1 = Math.atan2(pen.y - circle.y, pen.x - circle.x);
        const ang2 = Math.atan2(y - circle.y, x - circle.x);
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, ang1, ang2, circle.CCW);
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.stroke();
        pen.x = x;
        pen.y = y;
    } else if (typ == TC_ || typ in NOT_DRAW_IMPLEMENTED) {
        ctx.setLineDash([1, 2, 0.5])
        ctx.lineWidth = s.select ? currentLineWidth * 2 : currentLineWidth;;
        ctx.strokeStyle = s.select ? colorSelected : s.bad ? s.color : getStrokeStyle(s.onoffevap)
        ctx.fillStyle = s.select ? colorSelected : s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;

        ctx.font = "10px sans-serif";
        ctx.fillText("+", pen.x, pen.y);
        ctx.font = "3px sans-serif";
        ctx.fillText(s.params.cmd, pen.x, pen.y + currentLineWidth * 7);

        return
    }
}