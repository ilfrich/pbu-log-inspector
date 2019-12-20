
local-install:
	cd pip && sudo python3 setup.py develop

local-uninstall:
	cd pip && sudo python3 setup.py develop --uninstall

install-dependencies:
	cd npm && npm i && cd ..
	cd pip && pip3 install -r requirements.txt && cd ..
