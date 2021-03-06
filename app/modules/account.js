import { getAccountsFromWIFKey } from "neon-js";

// Constants
export const LOGIN = "LOGIN";
export const BTC_LOGIN = "BTCLOGIN";
export const LTC_LOGIN = "LTCLOGIN";
export const ETH_LOGIN = "ETHLOGIN";
export const ELA_LOGIN = "ELA_LOGIN";
export const LTC_CREATED = "LTCCREATED";
export const ETH_CREATED = "ETHCREATED";
export const ELA_CREATED = "ELACREATED";
export const BTC_LOGIN_REDIRECT = "BTCLOGIN_REDIRECT";
export const LTC_LOGIN_REDIRECT = "LTCLOGIN_REDIRECT";
export const ETH_LOGIN_REDIRECT = "ETHLOGIN_REDIRECT";
export const ELA_LOGIN_REDIRECT = "ELALOGIN_REDIRECT";
export const LOGOUT = "LOGOUT";
export const SET_ADDRESS = "SET_ADDRESS";
export const SET_DECRYPTING = "SET_DECRYPTING";
export const SET_KEYS = "SET_KEYS";
export const SET_LTC_KEYS = "SET_LTC_KEYS";
export const SET_ETH_KEYS = "SET_ETH_KEYS";
export const SET_ELA_KEYS = "SET_ELA_KEYS";
export const FINDING_LEDGER_NOTICE =
  "Looking for USB Devices. Please plugin your device and login.";
export const BIP44_PATH =
  "8000002C" + "80000378" + "80000000" + "00000000" + "00000000";

export const HARDWARE_DEVICE_INFO = "HARDWARE_DEVICE_INFO";
export const HARDWARE_PUBLIC_KEY_INFO = "HARDWARE_PUBLIC_KEY_INFO";
export const HARDWARE_PUBLIC_KEY = "HARDWARE_PUBLIC_KEY";
export const HARDWARE_LOGIN = "HARDWARE_LOGIN";

// export function hardwareDeviceInfo(hardwareDeviceInfo) {
// 	return {
// 		type: HARDWARE_DEVICE_INFO,
// 		payload: { hardwareDeviceInfo }
// 	};
// }
//
// export function hardwarePublicKeyInfo(hardwarePublicKeyInfo) {
// 	return {
// 		type: HARDWARE_PUBLIC_KEY_INFO,
// 		payload: { hardwarePublicKeyInfo }
// 	};
// }
//
// export function hardwarePublicKey(publicKey) {
// 	return {
// 		type: HARDWARE_PUBLIC_KEY,
// 		payload: { publicKey }
// 	};
// }
//
// export function isHardwareLogin(isHardwareLogin) {
// 	return {
// 		type: HARDWARE_LOGIN,
// 		payload: { isHardwareLogin }
// 	};
// }
//
// export function ledgerNanoSGetLogin() {
// 	return {
// 		type: LOGIN,
// 		payload: { signingFunction: ledgerNanoSCreateSignatureAsync }
// 	};
// }
//
// export const ledgerNanoSGetInfoAsync = () => async dispatch => {
// 	const dispatchError = (message, deviceInfoMsg) => {
// 		dispatch(isHardwareLogin(false));
// 		dispatch(hardwarePublicKey(null));
// 		if (deviceInfoMsg) {
// 			dispatch(hardwarePublicKeyInfo(null));
// 			return dispatch(hardwareDeviceInfo(message));
// 		} else {
// 			return dispatch(hardwarePublicKeyInfo(message));
// 		}
// 	};
// 	dispatch(hardwareDeviceInfo(FINDING_LEDGER_NOTICE));
// 	let [err, result] = await asyncWrap(commNode.list_async());
// 	if (err) {
// 		return dispatchError(`Finding USB Error: ${err}. ${FINDING_LEDGER_NOTICE}`);
// 	}
// 	if (result.length === 0) {
// 		return dispatchError(
// 			`USB Failure: No device found. ${FINDING_LEDGER_NOTICE}`
// 		);
// 	} else {
// 		let [err, comm] = await asyncWrap(commNode.create_async());
// 		if (err) {
// 			return dispatchError(
// 				`Finding USB Error: ${err}. ${FINDING_LEDGER_NOTICE}`
// 			);
// 		}
//
// 		const deviceInfo = comm.device.getDeviceInfo();
// 		comm.device.close();
// 		dispatch(
// 			hardwareDeviceInfo(
// 				`Found USB ${deviceInfo.manufacturer} ${deviceInfo.product}`
// 			)
// 		);
// 	}
// 	[err, result] = await asyncWrap(commNode.list_async());
// 	if (result.length === 0) {
// 		return dispatchError(
// 			"Hardware Device Error. Login to NEO App and try again",
// 			false
// 		);
// 	} else {
// 		let [err, comm] = await asyncWrap(commNode.create_async());
// 		if (err) {
// 			console.log(`Public Key Comm Init Error: ${err}`);
// 			return dispatchError(
// 				"Hardware Device Error. Login to NEO App and try again",
// 				false
// 			);
// 		}
//
// 		let message = Buffer.from(`8004000000${BIP44_PATH}`, "hex");
// 		const validStatus = [0x9000];
// 		let [error, response] = await asyncWrap(
// 			comm.exchange(message.toString("hex"), validStatus)
// 		);
// 		if (error) {
// 			comm.device.close(); // NOTE: do we need this close here - what about the other errors that do not have it at the moment
// 			if (error === "Invalid status 28160") {
// 				return dispatchError(
// 					"NEO App does not appear to be open, request for private key returned error 28160.",
// 					false
// 				);
// 			} else {
// 				console.log(`Public Key Comm Messaging Error: ${error}`);
// 				return dispatchError(
// 					"Hardware Device Error. Login to NEO App and try again",
// 					false
// 				);
// 			}
// 		}
// 		comm.device.close();
// 		dispatch(isHardwareLogin(true));
// 		dispatch(hardwarePublicKey(response.substring(0, 130)));
// 		return dispatch(
// 			hardwarePublicKeyInfo(
// 				"Success. NEO App Found on Hardware Device. Click Button Above to Login"
// 			)
// 		);
// 	}
// };


export function ledgerNanoSGetLogin(account) {
	return {
		type: HARDWARE_LOGIN,
		isHardwareLogin: true,
		account: account,
		address: account.address
	}
}
// Actions
export function login(wif) {
	return {
		type: LOGIN,
		wif: wif
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}

export function decrypting(bool) {
	return {
		type: SET_DECRYPTING,
		state: bool
	};
}

export function setKeys(keys) {
	return {
		type: SET_KEYS,
		keys
	};
}

export function setLtcKeys(ltckeys) {
    return {
		type: SET_LTC_KEYS,
		ltckeys
    };
}

export function setElaKeys(elakeys) {
    return {
		type: SET_ELA_KEYS,
		elakeys
    };
}

export function setEthKeys(ethkeys) {
	return {
		type: SET_ETH_KEYS,
		ethkeys
	}
}

export function setAddress(address) {
	return {
		type: SET_ADDRESS,
		address: address
	};
}

export function btcLogIn(pa, pk){
	return {
		type: BTC_LOGIN,
		pa: pa,
		pk: pk
	}
}

export function btcLoginRedirect(path) {
	return {
		type: BTC_LOGIN_REDIRECT,
		path: path,
	}
}


export function elaLogIn(pa, pk){
    return {
		type: ELA_LOGIN,
		pa: pa,
		pk: pk
    }
}

export function elaLoginRedirect(path) {
    return {
		type: ELA_LOGIN_REDIRECT,
		path: path,
    }
}

export function ltcLogIn(pa, pk){
    return {
		type: LTC_LOGIN,
		pa: pa,
		pk: pk
    }
}

export function ltcLoginRedirect(path) {
    return {
		type: LTC_LOGIN_REDIRECT,
		path: path,
    }
}

export function ethLogIn(pa, pk){
    return {
		type: ETH_LOGIN,
		pa: pa,
		pk: pk
    }
}

export function ethLoginRedirect(path) {
    return {
		type: ETH_LOGIN_REDIRECT,
		path: path,
    }
}

export function elaCreated() {
    return {
		type: ELA_CREATED
    }
}

export function ltcCreated() {
	return {
		type: LTC_CREATED
	}
}

export function ethCreated() {
    return {
		type: ETH_CREATED
    }
}
// Reducer that manages account state (account now = private key)
export default (
	state = {
		wif: null,
		address: null,
		loggedIn: false,
		account: null,
		redirectUrl: null,
		decrypting: false,
		accountKeys: [],
		btcLoggedIn: false,
		btcPrivKey: null,
		btcPubAddr: null,
		ltcCreated: false,
		ltcLoggedIn: false,
		ltcPrivKey: null,
		ltcPubAddr: null,
		elaCreated: false,
		elaLoggedIn: false,
		elaPrivKey: null,
		elaPubAddr: null,
		ethCreated: false,
		ethLoggedIn: false,
		ethPrivKey: null,
		ethPubAddr: null,
		btcAccountKeys: [],
		ltcAccountKeys: [],
		ethAccountKeys: [],
		elaAccountKeys: [],
		isHardwareLogin: false
	},
	action
) => {
	switch (action.type) {
	case LOGIN:
		let loadAccount;
		try {
			loadAccount = getAccountsFromWIFKey(action.wif)[0];
		} catch (e) {
			loadAccount = -1;
		}
		if (
		loadAccount === -1 ||
		loadAccount === -2 ||
		loadAccount === undefined
		) {
			return { ...state, wif: action.wif, loggedIn: false };
		}
		return {
			...state,
			wif: action.wif,
			address: loadAccount.address,
			loggedIn: true,
			decrypting: false
		};
	case HARDWARE_LOGIN:
		return {
			...state,
			address: action.account.address,
			isHardwareLogin: true,
			account: action.account
		}
	case LOGOUT:
		return {
			...state,
			wif: null,
			address: null,
			loggedIn: false,
			decrypting: false
		};
	case SET_ADDRESS:
		return {
			...state,
			wif: null,
			address: action.address
		};
	case SET_DECRYPTING:
		return { ...state, decrypting: action.state };
	case SET_KEYS:
		return { ...state, accountKeys: action.keys };
	case SET_LTC_KEYS:
		return {
			...state,
			ltcAccountKeys: action.ltckeys
		};
	case SET_ELA_KEYS:
		return {
			...state,
			elaAccountKeys: action.elakeys
		};
	case SET_ETH_KEYS:
		return {
			...state,
			ethAccountKeys: action.ethkeys
		};
	case BTC_LOGIN:
		return {
			...state,
			btcLoggedIn: true,
			btcPrivKey: action.pk,
			btcPubAddr: action.pa
		};

	case BTC_LOGIN_REDIRECT:
		return {
			...state,
			btcLoginRedirect: action.path,
		}
	case LTC_LOGIN:
		return {
			...state,
			ltcLoggedIn: true,
			ltcPrivKey: action.pk,
			ltcPubAddr: action.pa
		};

	case LTC_LOGIN_REDIRECT:
		return {
			...state,
			ltcLoginRedirect: action.path,
		}
	case ELA_LOGIN:
		return {
			...state,
			elaLoggedIn: true,
			elaPrivKey: action.pk,
			elaPubAddr: action.pa
		};

	case ELA_LOGIN_REDIRECT:
		return {
			...state,
			elaLoginRedirect: action.path,
		}

	case ETH_LOGIN:
		return {
			...state,
			ethLoggedIn: true,
			ethPrivKey: action.pk,
			ethPubAddr: action.pa
		};

	case ETH_LOGIN_REDIRECT:
		return {
			...state,
			ethLoginRedirect: action.path,
		}
	case LTC_CREATED:
		return {
			...state,
			ltcCreated: true
		}
	case ETH_CREATED:
		return {
			...state,
			ethCreated: true
		}
	default:
		return state;
	}
};
