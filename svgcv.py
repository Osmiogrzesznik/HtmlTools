
from svg_to_gcode.formulas import linear_map
from svg_to_gcode.svg_parser import parse_file
from _compilerWithDynamicFooter import CompilerWithDynamicFooter
from TrumpfGcode import TrumpfGcode
from MACROS_CurveEnd import CurveEndMacro
from LaserLST import LaserLST
from Laser2 import Laser2
from BlankEZpurp import BlankEZpurp
from svg_to_gcode import TOLERANCES
import os


parser = TrumpfGcode()
# parser = CurveEndMacro()
# purpose = BlankEZpurp()
# purpose = Laser1()
purpose = LaserLST()
# purpose = MacroTC_CIRC2() // end of curve will output a circle
parser.setPurpose(purpose)
parser.setCutType(100)

# Instantiate a compiler, specifying the custom interface and the speed at which the tool should move.
# FILENAME = "stencils.svg"
# FILENAME = "stencilsRows.svg"
FILENAME = "gasketTEST.svg"
filename_wout_ext, file_extension = os.path.splitext(FILENAME)
NC_compat_filename = filename_wout_ext.upper()

# curves = parse_file("stencils.svg")  # Parse an svg file into geometric curves
curves = parse_file(FILENAME)  # Parse an svg file into geometric curves
print(len(curves))
# TODO found a Trumpf bug ? if you rename your label as STOP_TEXT OR START_TEXT what will happen ;)
cfooter = [purpose.f(NC_compat_filename)]
cheader = [purpose.h(NC_compat_filename)]


gcode_compiler = CompilerWithDynamicFooter(
    parser, NC_compat_filename, movement_speed=1000, cutting_speed=300, pass_depth=0, custom_footer=cfooter, custom_header=cheader)


gcode_compiler.append_curves(curves)
gcode_compiler.compile_to_file(NC_compat_filename+".LST", passes=1)

print("Finished File:", NC_compat_filename+".LST at date :", parser.ddd())
