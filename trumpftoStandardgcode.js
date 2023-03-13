time_Start = 0;
textFromFileLoaded = ''

/* my tools to make development on mobile phone easier*/
window.onerror = (...x) => {
    x[2] = x[2] - 8;
    console.error(x);
}

say = console.log


sa = x => say(x);
say(2)

p = x => tout.innerText += x
p2 = x => tout.innerText = x
pl = x => p(x + "\n")
as = (...x) => x.join('')
ap = (...x) => p(as(...x))
apl = (...x) => pl(as(...x))

function rep(i, func) {
    if (func()) {
        setTimeout(x => rep(func), 100)
    }

}







// CIP can be simplified into straight lines
const colorON = 'rgba(0,0,0,1)';
const colorOFF = 'rgba(100,100,100,0.3)';
const colorMarkEvap = 'rgba(0,255,0,1)';

const colorUnknownCMD = 'rgba(0,0,155,1)';
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

TC_OBLONG2 = 0
TC_STARTPOS2 = 0
const TC_ = 'TC_'
const TC_n = -1
const G_ = "G0"
const CIP = 'CIP'
const CIPn = 5
const TC_RECT2 = 'TC_RECT2' //put a star on last params
const TC_RECT2n = -11; //put a star on last params
const TC_CIRC2 = 'TC_CIRC2'
const TC_CIRC2n = 6;
const BLOCK_START = 'BLOCK_START'
const BLOCK_STARTn = -1000



const NOT_OFFSETABLE_CMDS = {
    TC_,
    TC_CIRC2,
    TC_RECT2,
    BLOCK_START
}
const NOT_DRAW_IMPLEMENTED = {
    TC_,
    TC_RECT2,
    BLOCK_START
}

const DO_NOT_DRAW = {
    BLOCK_START
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
    discardAfter: "Z",
}

// Create canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
//TODO scale to bounding box
//scale to 

// Define initial pen position
var StartparamsSet = false;
var penX = 0;
var penY = 0;
curX = 0
curY = 0
curN = null;
points = []
var ctx_scl = 4;
var ctx_lw = 0.5;


function getBetween(gcln, cmd1, cmd2, curV) {
    let iStart = gcln.indexOf(cmd1) + cmd1.length
    let iEnd = cmd2 ? gcln.indexOf(cmd2) - 1 : gcln.length;
    strv = gcln.substring(iStart, iEnd)
    Numv = parseFloat(strv);
    if (isNaN(Numv)) {
        if (strv.startsWith("IC(")) {
            nv = parseFloat(strv.substring(3, strv.length - 1));
            return curV + nv
        }
    }
    return Numv;
}

function getlineNo(gcl) {
    let indEnd = -1;
    if (!gcl.startsWith("N")) return curN ? curN : 'N????';
    indEnd = gcl.indexOf(";")
    if (indEnd < 0) {
        indEnd = gcl.indexOf(" ")
        if (indEnd < 0) {
            console.warn("N line number finish malformed at lines following ", curN, '\n',
                gcl)
            return curN
        }
    }
    indEnd -= 1
    curN = gcl.substring(0, indEnd)
    return curN;
    //can save all info that i want now as second item in the first array
    //BLock number etc. i can make sequence that has no params and is ignored by maths later
}

function groupSectionsInBlocks(sar) {
    let blocks = [];
    // object instead of array?
    lastBind = -1;
    for (let i = 0; i < sar.length; i++) {
        let s = sar[i];

        if (s.typ == BLOCK_START) {

            lastBind++;
            blocks[lastBind] = [s]
            continue;
        }
        blocks[lastBind].push(s)
    }
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
                let msg = [i_in_metablock, " block in ", wmbi, " incosistent! block_no:", bcopy[0].B].join(" ")

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

                say(msg)
                reports.push(msg)
            }
            return true; //bcopyOK;

        })

    })

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
        if (!p1.xi == p2.xi) return false;
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


function interpretGCode(gCode) {
    const gCodeArray = gCode.split(/\r?\n/);
    curX = 0
    curY = 0
    curN = 0
    curB = 0
    points = []

    function addSection(typ, onoffevapState, params, gcl) {

        let ob = {

            typ: typ,
            onoffevap: onoffevapState,
            params: params,
            N: curN,
            B: curB,
            gc: gcl,
        }
        if (Object.values(params).some(isNaN)) {
            console.error(curN, "NOT stopping but line with NaN", [typ, params, curN, gcl])
        }
        points.push(ob)
        return ob
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

        lineNumber = getlineNo(gcln);

        //TODO  how to keep N numbers but no clutter
        let indEnd = gcln.indexOf(TK.discardAfter);
        indEnd = indEnd > -1 ? indEnd : gcln.length;
        gcln = gcln.substring(gcln.indexOf(" ") + 1, indEnd).trim();
        // console.log(gcln)
        //teraz typy

        if (gcln.startsWith(CIP)) {

            // TODO pozniej optymizuj czukaj indexu raz getBetween powtarza czynnosc
            xi = getBetween(gcln, I1cmd, J1cmd, curX)
            yj = getBetween(gcln, J1cmd, K1cmd, curY)
            x = getBetween(gcln, Xcmd, Ycmd, curX)
            y = getBetween(gcln, Ycmd, null, curY)
            arrr = addSection(CIP, GmodalState, {
                x,
                y,
                xi,
                yj
            }, gcln)
            // addSection(GmodalState, [x2, y2], gcln)
            curX = x;
            curY = y;
        } else if (gcln.startsWith(BLOCK_START)) {
            block_no = getBetween(gcln, BLOCK_START, "=", -1)
            // console.log(block_no, gcln)
            curB = block_no
            addSection(BLOCK_START, GmodalState, {
                block_no
            }, gcln)
            // addSection([GmodalState, GmodalState], [x, y], gcln)
            // curX = x;
            // curY = y;
        } else if (gcln.startsWith(G_)) {
            x = getBetween(gcln, Xcmd, Ycmd, curX)
            y = getBetween(gcln, Ycmd, null, curY)
            addSection(G_, GmodalState, {
                x,
                y
            }, gcln)
            curX = x;
            curY = y;
        } else if (gcln.startsWith(TC_LASER_ON)) {

            paramsstr = gcln.substring(TC_LASER_ON.length + 1, gcln.length - 1).split(',', 6);

            let kerf = paramsstr[3];
            let cutsevapsorwhat = {
                '100': 1,
                '500': 2
            } [kerf]
            // TODO GET here first number
            // console.log("ON--------------------------------------------------------ON")
            GmodalState = cutsevapsorwhat;
        } else if (gcln.startsWith('TC_LASER_OFF')) {
            GmodalState = 0;
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
                '500': 2
            } [kerf]


            /*
            N95900 G01 X = 548.74 Y = 730.06 Z = -197.00 B = 0.00 C = 0.00 F = 173000
            N95920 R1 = 548.74 R2 = 730.06 R3 = -207.00 R4 = 0.00 R5 = 0.00 R11 = 0.00 R26 = 12.00
            N95930 TC_CIRC2(5.86, 2.93, 0.50, 9, 10, 100, "ST020MDN2X-0")
            Czyli zawsze curX i curY(pozostale z ostatniej linii)
            */
            if (paramsar.some(isNaN)) {
                //TODO create IC( AC( procedure that can be called quickly
                throw Error(["possible IC() AC() in parameters! not yet supported !", curN, paramsob, gcln].join(" "))
                console.warn(curN, "possible IC()")
            }
            //TODO with this you can collect all weird parameters for better 
            //duplicatecheck
            arrr = addSection(TC_CIRC2, cutsevapsorwhat, paramsob, gcln)

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
                '500': 2
            } [kerf]

            /*
            
            Czyli zawsze curX i curY(pozostale z ostatniej linii)
            */
            if (paramsar.some(isNaN)) {
                //TODO create IC( AC( procedure that can be called quickly
                throw Error(["possible IC() AC() in parameters! not yet supported !", curN, params, gcln].join(" "))
                console.warn(curN, "possible IC()")
            }
            //TODO with this you can collect all weird parameters for better 
            //duplicatecheck
            arrr = addSection(TC_RECT2, cutsevapsorwhat, paramsob, gcln)

            //keep it simple
            //draw a star (ctx.text or smth)
        } else if (gcln.startsWith(TC_)) {
            idfhsj = gcln.indexOf("(")
            let cmd = gcln.substring(0, idfhsj);
            let paramsstr = gcln.substring(idfhsj + 1, gcln.length - 1).split(',', 8);
            console.log(cmd)

            addSection(TC_, GmodalState, {
                cmd: cmd,
                paramsstr: paramsstr
            }, gcln)
            //keep it simple
            //draw a star (ctx.text or smth)
        }
    }
    return points;
}

function getNumericCode_str_repr(sections) {
    return sections.map(getSection_str_repr).join("\n");
}

function getSection_str_repr(s) {
    let paramsRepr = Object.entries(s.params).flat().join(" ")
    x = Object.assign({}, s)
    x.params = paramsRepr
    return Object.entries(x).flat().join(" ")
}

function calcBoundBox(sections) {
    //TODO what about CIP and i and j (these are usually outside points)
    let xis = []
    let yjs = []
    let ys = sections.map(s => {
        if (s.typ in NOT_OFFSETABLE_CMDS) return NaN;
        if (s.typ === CIP) yjs.push(s.params.yj)

        return s.params.y
    })
    let xs = sections.map(s => {
        if (s.typ in NOT_OFFSETABLE_CMDS) return NaN;
        if (s.typ === CIP) xis.push(s.params.xi)
        return s.params.x
    })

    xs = xs.filter(x => !isNaN(x))
    ys = ys.filter(y => !isNaN(y))
    ys = ys.concat(yjs)
    xs = xs.concat(xis)
    maxX = Math.max(...xs)
    maxY = Math.max(...ys)
    minX = Math.min(...xs)
    minY = Math.min(...ys)
    rangeX = maxX - minX;
    rangeY = maxY - minY;
    return {
        minX,
        minY,
        maxX,
        maxY,
        rangeX,
        rangeY
    }
}


function drawFromPoints(sections) {

    bbox = calcBoundBox(sections)
    console.log(bbox)
    //prepare points by offseting them to their mins 
    getNumericCode_str_repr(sections);
    const offsSections = sections.map(s => {
        if (s.typ in NOT_OFFSETABLE_CMDS) return s;
        nups = {}
        olps = s.params
        nups.x = (olps.x - bbox.minX + (ctx_lw)) * 1;
        nups.y = (olps.y - bbox.maxY - (ctx_lw)) * -1;
        if (s.typ === CIP) { // TODO TC_CIRCLE.typ
            nups.xi = (olps.xi - bbox.minX + (ctx_lw)) * 1;
            nups.yj = (olps.yj - bbox.maxY - (ctx_lw)) * -1;
        }
        nus = Object.assign({}, s)
        nus.params = nups;
        return nus;
    })
    getNumericCode_str_repr(offsSections);

    canvas.width = (bbox.rangeX * ctx_scl) + (ctx_lw * ctx_scl * 2);
    canvas.height = (bbox.rangeY * ctx_scl) + (ctx_lw * ctx_scl * 2);

    ctx.scale(ctx_scl, ctx_scl)


    ctx.setLineDash([2, 2])
    ctx.lineWidth = ctx_lw;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "6px sans-serif";

    // canvas.width = bbox.rangeX * 4 + 7;
    // canvas.height = bbox.rangeY * 4 + 7;
    document.body.appendChild(canvas);

    // Get canvas context

    // ctx.scale(4, 4)
    // ctx.setLineDash([2, 2])
    // ctx.lineWidth = 0.5;
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // var srcWidth = canvas.width / scale;
    // var srcHeight = canvas.height / scale;
    //TODO scale to bounding box
    //TODO get starting point from first point
    penX = sections[0].params.x
    penY = sections[0].params.y
    offsSections.map(s => drawSection(s));
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

function drawSection(section) {
    let s = section
    let typ = s.typ

    let GmodalState = s.onoffevap
    let params = s.params
    let x = params.x;
    let y = params.y;
    // console.log(typ)

    if (typ in DO_NOT_DRAW) {
        if (typ = BLOCK_START) {
            ctx.font = "3px sans-serif";
            ctx.fillStyle = s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;
            if (s.bad && s.tags) {
                ctx.fillText(s.tags.order + "", penX, penY);
            }

            // console.log(s.onoffevap)

        }
        return
    }

    //do somthing messed up Gmodal z typ
    if (typ == G_) {
        // console.log(s.N)
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.moveTo(penX, penY);
        ctx.lineTo(x, y);
        ctx.stroke();
        penX = x;
        penY = y;
    } else if (typ == TC_RECT2) {
        ctx.setLineDash([1, 2, 0.5])
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap)
        ctx.fillStyle = s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;

        // ctx.font = "10px sans-serif";
        // ctx.fillText("+", penX, penY);
        ctx.font = "3px sans-serif";
        ctx.fillText("TC_RECT2-WIP", penX, penY + ctx_lw * 7);
        // console.log(s.onoffevap)
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        let cx = penX
        let cy = penY

        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.rect(penX - params.sideX, penY - params.sideY, params.sideX, params.sideY);
        ctx.stroke();

    } else if (typ == TC_CIRC2) {
        // console.log(s.onoffevap)
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        let cx = penX
        let cy = penY
        let r = params.r
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 360, false);
        ctx.stroke();

    } else if (typ == CIP) {
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap, s.typ);
        // console.log(s)
        ctx.setLineDash(getDashStyle(s.onoffevap, s.typ))
        let xi = params.xi
        let yj = params.yj

        let circle = fitCircleToPoints(penX, penY, xi, yj, x, y);
        // let circle = fitCircleToPoints(penX, penY, points[2], points[3], points[4], points[5]);
        if (!circle) {
            say("not possible to draw this CIP", s.N, s.gc)
            return;
        }
        const ang1 = Math.atan2(penY - circle.y, penX - circle.x);
        const ang2 = Math.atan2(y - circle.y, x - circle.x);
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, ang1, ang2, circle.CCW);
        ctx.stroke();
        penX = x;
        penY = y;
    } else if (typ == TC_ || typ in NOT_DRAW_IMPLEMENTED) {
        ctx.setLineDash([1, 2, 0.5])
        ctx.strokeStyle = s.bad ? s.color : getStrokeStyle(s.onoffevap)
        ctx.fillStyle = s.bad ? s.color : GmodalState ? colorUnknownCMD : colorUnknownCMDSemi;

        ctx.font = "10px sans-serif";
        ctx.fillText("+", penX, penY);
        ctx.font = "3px sans-serif";
        ctx.fillText(s.params.cmd, penX, penY + ctx_lw * 7);

        return
    }
}