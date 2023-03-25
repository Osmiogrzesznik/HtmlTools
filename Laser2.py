from IPurpose import IPurpose


class Laser2(IPurpose):
    _TECH_TABLE = "SS1MM"

    def h(self, NC_compat_filename):
        TECH_TABLE = self._TECH_TABLE
        oo = f'''BD
C
BEGIN_EINRICHTEPLAN_INFO
C
ZA,MM,2
MM,AT,1, 60,1,1,,,,,T
MM,AT,1,170,1,1,,,,,T
C
ZA,DA,1
DA,{NC_compat_filename},1
C
ENDE_EINRICHTEPLAN_INFO
C
BEGIN_LTT_STAMM
C
ZA,MM,233
MM,AT,1,10,1,1,,,,,T
MM,AT,1,80,1,1,,,,,T
MM,AT,1,90,1,1,,,,'W',Z
MM,AT,1,100,1,1,,,,,T
MM,AT,1,110,1,1,,,,'mm',Z
MM,AT,1,120,1,1,,,,'in',Z
MM,AT,1,130,1,1,,,,'mm',T
MM,AT,1,140,1,1,,,,,Z
MM,AT,1,150,1,1,,,,'s',Z
MM,AT,1,160,1,1,,,,'s',Z
MM,AT,1,170,1,1,,,,'mm',Z
MM,AT,1,180,1,1,,,,'m/s2',Z
MM,AT,1,190,1,1,,,,'m/s2',Z
MM,AT,1,200,1,1,,,,'s',Z
MM,AT,1,210,1,1,,,,'%',Z
MM,AT,1,220,1,1,,,,,Z
MM,AT,1,230,1,1,,,,,Z
MM,AT,1,240,1,1,,,,'mm',Z
MM,AT,1,250,1,1,,,,'W',Z
MM,AT,1,260,1,1,,,,'Hz',Z
MM,AT,1,270,1,1,,,,'m/min',Z
MM,AT,1,280,1,1,,,,'mm',Z
MM,AT,1,290,1,1,,,,'bar',Z
MM,AT,1,300,1,1,,,,'W',Z
MM,AT,1,310,1,1,,,,'Hz',Z
MM,AT,1,320,1,1,,,,'m/min',Z
MM,AT,1,330,1,1,,,,'mm',Z
MM,AT,1,340,1,1,,,,'bar',Z
MM,AT,1,350,1,1,,,,'mm',Z
MM,AT,1,360,1,1,,,,'W',Z
MM,AT,1,370,1,1,,,,'Hz',Z
MM,AT,1,380,1,1,,,,'m/min',Z
MM,AT,1,390,1,1,,,,'mm',Z
MM,AT,1,400,1,1,,,,'bar',Z
MM,AT,1,410,1,1,,,,'W',Z
MM,AT,1,420,1,1,,,,'Hz',Z
MM,AT,1,430,1,1,,,,'m/min',Z
MM,AT,1,440,1,1,,,,'mm',Z
MM,AT,1,450,1,1,,,,'bar',Z
MM,AT,1,460,1,1,,,,'mm',Z
MM,AT,1,470,1,1,,,,'W',Z
MM,AT,1,480,1,1,,,,'Hz',Z
MM,AT,1,490,1,1,,,,'m/min',Z
MM,AT,1,500,1,1,,,,'mm',Z
MM,AT,1,510,1,1,,,,'bar',Z
MM,AT,1,520,1,1,,,,'W',Z
MM,AT,1,530,1,1,,,,'Hz',Z
MM,AT,1,540,1,1,,,,'m/min',Z
MM,AT,1,550,1,1,,,,'mm',Z
MM,AT,1,560,1,1,,,,'bar',Z
MM,AT,1,570,1,1,,,,'mm',Z
MM,AT,1,580,1,1,,,,'s',Z
MM,AT,1,590,1,1,,,,,Z
MM,AT,1,600,1,1,,,,'mm',Z
MM,AT,1,610,1,1,,,,'s',Z
MM,AT,1,620,1,1,,,,,Z
MM,AT,1,630,1,1,,,,'bar',Z
MM,AT,1,640,1,1,,,,,Z
MM,AT,1,650,1,1,,,,'s',Z
MM,AT,1,660,1,1,,,,,Z
MM,AT,1,670,1,1,,,,'mm',Z
MM,AT,1,680,1,1,,,,'s',Z
MM,AT,1,690,1,1,,,,,Z
MM,AT,1,700,1,1,,,,'bar',Z
MM,AT,1,710,1,1,,,,,Z
MM,AT,1,720,1,1,,,,'mm',Z
MM,AT,1,730,1,1,,,,'s',Z
MM,AT,1,740,1,1,,,,'mm',Z
MM,AT,1,750,1,1,,,,'W',Z
MM,AT,1,760,1,1,,,,'Hz',Z
MM,AT,1,770,1,1,,,,'m/min',Z
MM,AT,1,780,1,1,,,,,Z
MM,AT,1,790,1,1,,,,'bar',Z
MM,AT,1,800,1,1,,,,'mm',Z
MM,AT,1,810,1,1,,,,'mm',Z
MM,AT,1,820,1,1,,,,'W',Z
MM,AT,1,830,1,1,,,,'Hz',Z
MM,AT,1,840,1,1,,,,'m/min',Z
MM,AT,1,850,1,1,,,,,Z
MM,AT,1,860,1,1,,,,'bar',Z
MM,AT,1,870,1,1,,,,'mm',Z
MM,AT,1,880,1,1,,,,'mm',Z
MM,AT,1,890,1,1,,,,'W',Z
MM,AT,1,900,1,1,,,,'Hz',Z
MM,AT,1,910,1,1,,,,'m/min',Z
MM,AT,1,920,1,1,,,,,Z
MM,AT,1,930,1,1,,,,'bar',Z
MM,AT,1,940,1,1,,,,'s',Z
MM,AT,1,950,1,1,,,,,Z
MM,AT,1,960,1,1,,,,'mm',Z
MM,AT,1,970,1,1,,,,,Z
MM,AT,1,980,1,1,,,,'bar',Z
MM,AT,1,990,1,1,,,,'mm',Z
MM,AT,1,1000,1,1,,,,'s',Z
MM,AT,1,1010,1,1,,,,,Z
MM,AT,1,1020,1,1,,,,'mm',Z
MM,AT,1,1030,1,1,,,,,Z
MM,AT,1,1040,1,1,,,,'bar',Z
MM,AT,1,1050,1,1,,,,'s',Z
MM,AT,1,1060,1,1,,,,,Z
MM,AT,1,1070,1,1,,,,'mm',Z
MM,AT,1,1080,1,1,,,,,Z
MM,AT,1,1090,1,1,,,,'bar',Z
MM,AT,1,1110,1,1,,,,'%',Z
MM,AT,1,1120,1,1,,,,'mm',Z
MM,AT,1,1130,1,1,,,,'mm',Z
MM,AT,1,1140,1,1,,,,'mm',Z
MM,AT,1,1150,1,1,,,,'s',Z
MM,AT,1,1160,1,1,,,,'m/s2',Z
MM,AT,1,1730,1,1,,,,'Bool',Z
MM,AT,1,1740,1,1,,,,'%',Z
MM,AT,1,1750,1,1,,,,'%',Z
MM,AT,1,1760,1,1,,,,,Z
MM,AT,1,1770,1,1,,,,'%',Z
MM,AT,1,1780,1,1,,,,'%',Z
MM,AT,1,1790,1,1,,,,'%',Z
MM,AT,1,1800,1,1,,,,'%',Z
MM,AT,1,1810,1,1,,,,'%',Z
MM,AT,1,1820,1,1,,,,'%',Z
MM,AT,1,1830,1,1,,,,'%',Z
MM,AT,1,1840,1,1,,,,'%',Z
MM,AT,1,1850,1,1,,,,,Z
MM,AT,1,1860,1,1,,,,,Z
MM,AT,1,1870,1,1,,,,'mm',Z
MM,AT,1,1880,1,1,,,,'mm',Z
MM,AT,1,1890,1,1,,,,'mm',Z
MM,AT,1,1900,1,1,,,,'mm',Z
MM,AT,1,1910,1,1,,,,'mm',Z
MM,AT,1,1920,1,1,,,,'mm',Z
MM,AT,1,1930,1,1,,,,'mm',Z
MM,AT,1,1940,1,1,,,,'mm',Z
MM,AT,1,1950,1,1,,,,'m/min',Z
MM,AT,1,1960,1,1,,,,'W',Z
MM,AT,1,1970,1,1,,,,'m/min',Z
MM,AT,1,1980,1,1,,,,'W',Z
MM,AT,1,1990,1,1,,,,'m/min',Z
MM,AT,1,2000,1,1,,,,'Hz',Z
MM,AT,1,2010,1,1,,,,'m/min',Z
MM,AT,1,2020,1,1,,,,'Hz',Z
MM,AT,1,2030,1,1,,,,'mm',Z
MM,AT,1,2040,1,1,,,,'Bool',Z
MM,AT,1,2050,1,1,,,,'Bool',Z
MM,AT,1,2060,1,1,,,,'m/s2',Z
MM,AT,1,2070,1,1,,,,'mm',Z
MM,AT,1,2080,1,1,,,,'mm',Z
MM,AT,1,2090,1,1,,,,'s',Z
MM,AT,1,2100,1,1,,,,,Z
MM,AT,1,2110,1,1,,,,'mm',Z
MM,AT,1,2120,1,1,,,,'s',Z
MM,AT,1,2130,1,1,,,,,Z
MM,AT,1,2140,1,1,,,,'bar',Z
MM,AT,1,2150,1,1,,,,,Z
MM,AT,1,2160,1,1,,,,,Z
MM,AT,1,2170,1,1,,,,'Bool',Z
MM,AT,1,2180,1,1,,,,'mm',Z
MM,AT,1,2190,1,1,,,,'s',Z
MM,AT,1,2200,1,1,,,,,Z
MM,AT,1,2210,1,1,,,,'mm',Z
MM,AT,1,2220,1,1,,,,'s',Z
MM,AT,1,2230,1,1,,,,,Z
MM,AT,1,2240,1,1,,,,'bar',Z
MM,AT,1,2250,1,1,,,,,Z
MM,AT,1,2260,1,1,,,,,Z
MM,AT,1,2270,1,1,,,,'Bool',Z
MM,AT,1,2280,1,1,,,,'m/s2',Z
MM,AT,1,2290,1,1,,,,,Z
MM,AT,1,2300,1,1,,,,,T
MM,AT,1,2310,1,1,,,,'mm',Z
MM,AT,1,2320,1,1,,,,'m/s2',Z
MM,AT,1,2330,1,1,,,,,Z
MM,AT,1,2340,1,1,,,,,Z
MM,AT,1,2350,1,1,,,,,Z
MM,AT,1,2360,1,1,,,,'m/min',Z
MM,AT,1,2370,1,1,,,,'W',Z
MM,AT,1,2380,1,1,,,,'m/min',Z
MM,AT,1,2390,1,1,,,,'W',Z
MM,AT,1,2400,1,1,,,,'Hz',Z
MM,AT,1,2410,1,1,,,,'Hz',Z
MM,AT,1,2420,1,1,,,,'m/s2',Z
MM,AT,1,2430,1,1,,,,'m/s2',Z
MM,AT,1,2440,1,1,,,,'mm',Z
MM,AT,1,2450,1,1,,,,'m/min',Z
MM,AT,1,2460,1,1,,,,'W',Z
MM,AT,1,2470,1,1,,,,'m/min',Z
MM,AT,1,2480,1,1,,,,'Hz',Z
MM,AT,1,2490,1,1,,,,,Z
MM,AT,1,2510,1,1,,,,,Z
MM,AT,1,2520,1,1,,,,,Z
MM,AT,1,2530,1,1,,,,,Z
MM,AT,1,2540,1,1,,,,'mm',Z
MM,AT,1,2550,1,1,,,,'s',Z
MM,AT,1,2560,1,1,,,,'bar',Z
MM,AT,1,2570,1,1,,,,'mm',Z
MM,AT,1,2580,1,1,,,,'s',Z
MM,AT,1,2590,1,1,,,,'bar',Z
MM,AT,1,2500,1,1,,,,'W',Z
MM,AT,1,2700,1,1,,,,,Z
MM,AT,1,2710,1,1,,,,,Z
MM,AT,1,2720,1,1,,,,,Z
MM,AT,1,2730,1,1,,,,'mm',Z
MM,AT,1,2740,1,1,,,,'mm',Z
MM,AT,1,2750,1,1,,,,'mm',Z
MM,AT,1,2760,1,1,,,,'mm',Z
MM,AT,1,2770,1,1,,,,'mm',Z
MM,AT,1,2780,1,1,,,,'mm',Z
MM,AT,1,2630,1,1,,,,,T
MM,AT,1,2610,1,1,,,,'mm',Z
MM,AT,1,2620,1,1,,,,'mm',Z
MM,AT,1,2600,1,1,,,,,T
MM,AT,1,2640,1,1,,,,,T
MM,AT,1,2650,1,1,,,,,Z
MM,AT,1,2660,1,1,,,,,Z
MM,AT,1,2670,1,1,,,,,Z
MM,AT,1,2680,1,1,,,,,Z
MM,AT,1,2790,1,1,,,,,Z
MM,AT,1,2800,1,1,,,,,Z
MM,AT,1,2810,1,1,,,,,Z
MM,AT,1,2850,1,1,,,,'mm',Z
MM,AT,1,2860,1,1,,,,'m/min',Z
MM,AT,1,2870,1,1,,,,'mm',Z
MM,AT,1,2880,1,1,,,,'bar',Z
MM,AT,1,2890,1,1,,,,'mm',Z
MM,AT,1,2900,1,1,,,,'m/min',Z
MM,AT,1,2910,1,1,,,,'mm',Z
MM,AT,1,2920,1,1,,,,'bar',Z
MM,AT,1,2930,1,1,,,,'mm',Z
MM,AT,1,2940,1,1,,,,'m/min',Z
MM,AT,1,2950,1,1,,,,'mm',Z
MM,AT,1,2960,1,1,,,,'bar',Z
MM,AT,1,3130,1,1,,,,'W',Z
MM,AT,1,3140,1,1,,,,'W',Z
MM,AT,1,3150,1,1,,,,'W',Z
MM,AT,1,3160,1,1,,,,'W',Z
C
ZA,DA,2
DA,'{TECH_TABLE}','TC21',3200,'1.4301-10',1.0,6.1,'1.4',1,0.5,0.5,-1.5
 * ,-1.0,4.0,0.0,0.0,2,-1,0.2,3200,20000,8.0
 * ,0.8,13.0,-1,-1,-1.0,-1.0,-1.0,0.2,1200,5000
 * ,4.0,1.0,12.0,800,20000,4.0,1.0,8.0,0.23,800
 * ,500,1.0,1.0,13.0,-1,-1,-1.0,-1.0,-1.0,-1.5
 * ,0.2,1,1.0,-1.0,2,2.0,-1,0.5,8,1.5
 * ,-1.0,2,1.0,-1,-1.5,0.4,8.0,60,100,10.0
 * ,2,1.0,-2.0,5.0,180,5000,3.0,2,2.0,-3.0
 * ,8.0,300,100,1.0,2,5.0,0.2,8,2.0,2
 * ,2.0,-1.5,-1.0,-1,-1.0,-1,-1.0,-1.0,-1,-1.0
 * ,-1,-1.0,-1.0,-0.5,-2.0,-2.5,0.2,4.0,-1,-1
 * ,-1,1,100.0,100.0,0.0,100.0,100.0,100.0,0.0,100.0
 * ,-1,-1,20.0,20.0,20.0,20.0,20.0,20.0,20.0,20.0
 * ,7.3,3200,0.4,300,7.3,3000,0.4,400,-1.5,-1
 * ,-1,2.0,-1.0,-1.0,-1.0,-1,-1.0,-1.0,-1,-1.0
 * ,-1,-1,-1,-1.0,-1.0,-1,-1.0,-1.0,-1,-1.0
 * ,-1,-1,-1,4.0,0,'SS010MD-N2S-155FW32',0.0,15.0,8,1
 * ,-104,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,4.0,15.0,155
 * ,4.0,2000.0,4.0,10000.0,2,0,0,0,-1.0,-1.0
 * ,-1.0,-1.0,-1.0,-1.0,-1,0,0,0,0.0,0.0
 * ,0.0,9999.0,9999.0,9999.0,'1.4301',0,9999,'SS010MD-N2S-155FW32','FW',0
 * ,0,2,0,-1,-1,0,-99.0,0.0,0.0,0.0
 * ,-99.0,0.0,0.0,0.0,-99.0,0.0,0.0,0.0,-1,-1
 * ,-1,-1
C
ENDE_LTT_STAMM
C
BEGIN_LTT_CALLS
C
ZA,MM,1
MM,AT,1, 10,1,1,,,,,T
C
ZA,DA,1
DA,'{TECH_TABLE}'

C
ENDE_LTT_CALLS
C
C
BEGIN_PROGRAMM
C
ZA,MM,5
MM,AT,1, 10,1,1,,,,,T
MM,AT,1, 20,1,1,,,,,Z
MM,AT,1, 30,1,1,,,,,T
MM,AT,1, 40,1,1,,,,,Z
MM,AT,1, 50,1,1,,,,,T
C
ZA,DA,1
DA,'{NC_compat_filename}','HP',,,'LST'
START_TEXT'''
        return oo

    def f(self, NC_compat_filename):
        TECH_TABLE = self._TECH_TABLE

        oo = '''STOP_TEXT
C
ENDE_PROGRAMM
ED
C'''
        return oo

    def df(self, me):
        oo = f'''
{me.N}; END_OF_PROGRAM
{me.N} TC_RESET
{me.N} TC_LASER_OFF(2)
{me.N} M02'''
        return oo

    def dh(self, me):
        oo = f'''; This file is generated by the Code Converter Tool. L59: 4.5.3
{me.N};{me.NC_compat_filename}
{me.N};---------- TruTops Cell   VERSION 9.00
{me.N};Control Software Version TruLaser Cell 7040 1.0
{me.N} TC_RESET
{me.N} G71
{me.N} ; OVL, ACC
{me.N} TC_DYNAMIC_LEVEL(0)
{me.N} TC_OST(5.0)
{me.N} TC_ADC_ON(10)
{me.N} TC_TRAFO_ON("BC")
{me.N} TC_LASER_REQUEST(1)
{me.N} SET_G54(0.00,0.00,0.00); Comment out if program is used on the machine
SETAXG54(B,0)
SETAXG54(C,0)
{me.N} F = 173000
{me.N};GOTOF ENTRY_LASER
{me.N} TC_TRAFO_OFF
{me.N} G500
{me.N} G01 Z = 750.00 F = 173000
{me.N} G01 B = 0.00 C = 0.00
{me.N} TC_TRAFO_ON("BC")
{me.N} G54
{me.N}; END_OF_HEADER'''
        return oo
