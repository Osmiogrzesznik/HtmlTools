from IPurpose import IPurpose


class BlankEZpurp(IPurpose):
    _TECH_TABLE = "SS1MM"

    def h(self, NC_compat_filename):
        TECH_TABLE = self._TECH_TABLE
        oo = '''
'''
        return oo

    def f(self, NC_compat_filename):
        TECH_TABLE = self._TECH_TABLE

        oo = '''
'''
        return oo

    def df(self, me):
        oo = f'''
{me.N}; END_OF_PROGRAM
'''
        return oo

    def dh(self, me):
        oo = '''END_OF_HEADER'''
        return oo
