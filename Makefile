
local-install:
	cd pip && sudo python3 setup.py develop

local-uninstall:
	cd pip && sudo python3 setup.py develop --uninstall
