import warnings
import math
import typing
from svg_to_gcode import formulas
from svg_to_gcode.compiler.interfaces import Interface
from IPurpose import IPurpose
from svg_to_gcode.compiler import Compiler, interfaces
from svg_to_gcode.geometry import Vector
from svg_to_gcode import TOLERANCES
from datetime import datetime


class TrumpfGcode(Interface):

    verbose = False
    cutType = 500
    purpose = None

    def setPurpose(self, interface_class: typing.Type[IPurpose]):
        self.purpose = interface_class

    def setCutType(self, t):
        self.cutType = t

    def ddd(self):
        date = datetime.now().strftime('%a%d%b%Y%H%M%S')
        return date.upper()

    def calcX(self, x):
        # this is x
        return 440 + x

    def calcY(self, y):
        # this is x
        return 1930 - y
        # - getBoundingBoxifsvg.minY

    @property
    def N(self):
        if self._numbering != True:
            return ''
        self._N += 1
        return f'N{self._N}0'

    @N.setter
    def N(self, value):
        self._N = value

    @N.deleter
    def N(self):
        del self._N

    def __init__(self):
        self.cutting = False
        self._numbering = True
        self._N = 0
        self.position = Vector(0, 0)
        self.block_no = 0
        self._next_speed = None
        self._current_speed = None
        self.NC_compat_filename = self.ddd()

        # Round outputs to the same number of significant figures as the operational tolerance.
        self.precision = .2

    def set_NCfilename(self, NCfilename):
        if NCfilename is not None:
            self.NC_compat_filename = NCfilename
        else:
            self.NC_compat_filename = self.ddd()

    def set_movement_speed(self, speed):
        self._next_speed = speed
        return ''

    def linear_move(self, x=None, y=None, z=None):

        # if self._next_speed is None:
        #     raise ValueError(
        #         "Undefined movement speed. Call set_movement_speed before executing movement commands.")

        # Don't do anything if linear move was called without passing a value.
        if x is None and y is None and z is None:
            warnings.warn("linear_move command invoked without arguments.")
            return ''
        xo = self.calcX(x)
        yo = self.calcY(y)
        command = ''

        if self.cutting:
            command += self.N

            # Todo, investigate G0 command and replace movement speeds with G1 (normal speed) and G0 (fast move)
            command += " G01"

            # TODO HERE OFFSET ALL VALUES
            # Move if not 0 and not None
            command += f" X = {xo:.2f}" if x is not None else ''
            command += f" Y = {yo:.2f}" if y is not None else ''
            command += f" Z = {z:.2f}" if z is not None else ' Z = -207.00 B = 0.00 C = 0.00'

        # if self._current_speed != self._next_speed:
        #     self._current_speed = self._next_speed
        #     command += f" F = {self._current_speed}"

        if self.position is not None or (x is not None and y is not None):
            if x is None:
                x = self.position.x

            if y is None:
                y = self.position.y

            self.position = Vector(x, y)

        return command

    def laser_off(self):
        command = ''
        if self.cutting:

            x = self.position.x
            y = self.position.y
            xo = self.calcX(x)
            yo = self.calcY(y)
            command += f'''{self.N}; LEAD_OUT_START
{self.N} TC_LASER_OFF(3)
{self.N} G01 X = {xo:.2f} Y = {yo:.2f} Z = -197.00 B = 0.00 C = 0.00 F = 173000
{self.N}; LEAD_OUT_END
{self.N};==================== BLOCK_END ======================'''
        self.cutting = False
        return command

    def set_laser_power(self, power):
        x = self.position.x
        y = self.position.y
        xo = self.calcX(x)
        yo = self.calcY(y)

        self.block_no += 1
        # ln1 = self.linear_move(x, y, -197)
        # ln2 = self.linear_move(x, y, -207)
        boiler = f'''{self.N};==================== BLOCK_START {self.block_no} ===============
{self.N}; LEAD_IN_START
;ENTRY_LASER:
BLOCK_{self.block_no}:
{self.N} G01 X = {xo:.2f} Y = {yo:.2f} Z = -197.00 B = 0.00 C = 0.00 F = 173000
{self.N} G01 X = {xo:.2f} Y = {yo:.2f} Z = -207.00 B = 0.00 C = 0.00
{self.N} TC_LASER_ON(9,"{self.purpose._TECH_TABLE}",10,{self.cutType})
{self.N}; LEAD_IN_END'''
        self.position = Vector(x, y)
        self.cutting = True
        return boiler

    def set_absolute_coordinates(self):
        return ''  # "G90;"

    def set_relative_coordinates(self):
        return ''  # ';rel'  # "G91;"

    def dwell(self, milliseconds):
        return ''  # ';dwell'  # f"G4 P{milliseconds}"

    def set_origin_at_position(self):
        self.position = Vector(0, 0)
        # return "G92 X0 Y0 Z0;"
        return ''  # ";sets origin at position"

    def set_unit(self, unit):
        if unit == "mm":
            return ''  # ';set unit mm'  # "G21;"

        if unit == "in":
            return ''  # ';set unit in'  # "G20;"

        return ''

    def dynamic_footer(self):
        command = self.laser_off()
        command += self.purpose.df(self)
        return command

    def dynamic_header(self):
        return self.purpose.dh(self)
        bubuheader = f'''; This file is generated by the Code Converter Tool. L59: 4.5.3
{self.N};{self.NC_compat_filename}
{self.N};---------- TruTops Cell   VERSION 9.00
{self.N};Control Software Version TruLaser Cell 7040 1.0
{self.N} TC_RESET
{self.N} G71
{self.N} ; OVL, ACC
{self.N} TC_DYNAMIC_LEVEL(0)
{self.N} TC_OST(5.0)
{self.N} TC_ADC_ON(10)
{self.N} TC_TRAFO_ON("BC")
{self.N} TC_LASER_REQUEST(1)
{self.N} SET_G54(0.00,0.00,0.00); Comment out if program is used on the machine
SETAXG54(B,0)
SETAXG54(C,0)
{self.N} F = 173000
{self.N};GOTOF ENTRY_LASER
{self.N} TC_TRAFO_OFF
{self.N} G500
{self.N} G01 Z = 750.00 F = 173000
{self.N} G01 B = 0.00 C = 0.00
{self.N} TC_TRAFO_ON("BC")
{self.N} G54
{self.N}; END_OF_HEADER'''
        return bubuheader


def home_axes(self):
    return ';hello'  # "G28;"
