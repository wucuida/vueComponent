export function noop () {
	
}
//把元素为Object的Array 打印出来
export function arrayOfObjToStr(list) {
  let result = '['
    for(let obj of list){
      // result += this.objToStr(val)
      let r = '{'
      for(let k of Object.keys(obj)){
        if(Object.prototype.toString.call(obj[k]) === "[object Array]"){
          r += `${k}: [${obj[k]}], `
        }else{
          r += `${k}: ${obj[k]}, `
        }
        // r += `${k}: ${obj[k]}, `
      }
      r += '}'
      result += r
    }
  result += "]"
  return result
}
//验证是否为数组，且数组内所有元素为string
function isArrayOfString (v) {
	let isOneArray = Object.prototype.toString.call(v) === "[object Array]" 
		if(isOneArray){
			return v.every((e, i, a) => {return Object.prototype.toString.call(e) === "[object String]"})
		}
		return false
}

function loopMenuItem(children, cb) {
  let index = -1;
  children.forEach((c) => {
    index++;
    if (c && c.isMenuItemGroup) {
      c.$children.forEach((c2) => {
        index++;
        cb(c2, index);
      });
    } else {
      cb(c, index);
    }
  });
	// for(let index = 0; index < children.length; index++){
	// 	if(Object.prototype.toString.call(children[index]) === "[Object Array]"){

	// 	}else{
	// 		cb(children[index], index)
	// 	}
	// }
}

function getActiveKey(props, originalActiveKey) {
	// props = {
	// 	children,
	// 	eventKey,
	// 	defaultActiveFirst
	// }
	let activeKey = originalActiveKey;
    const children = props.children;
    const eventKey = props.eventKey;
    if (activeKey) {
    	let found;
	    loopMenuItem(children, (c, i) => {
	      	if (!c.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
	        	found = true;
	      	}
	    });
	    if (found) {
	      	return activeKey;
	    }
  	}
  	activeKey = null;
  	if (props.defaultActiveFirst) {
	    loopMenuItem(children, (c, i) => {
	      if (!activeKey && !c.disabled) {
	        activeKey = getKeyFromChildrenIndex(c, eventKey, i);
	      }
	    });
	    return activeKey;
  	}
  	return activeKey;
}

//------------引用react component table ------------
let scrollbarWidth;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};

export function measureScrollbar() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  if (scrollbarWidth) {
    return scrollbarWidth;
  }
  const scrollDiv = document.createElement('div');
  for (const scrollProp in scrollbarMeasure) {
    if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
      scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    }
  }
  document.body.appendChild(scrollDiv);
  const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  scrollbarWidth = width;
  return scrollbarWidth;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function debounceFunc() {
    const context = this;
    const args = arguments;
    // https://fb.me/react-event-pooling
    if (args[0] && args[0].persist) {
      args[0].persist();
    }
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
//---------------引用ant design 中util------------------------
export function flatArray(data = [], childrenName = 'children') {
  const result = [];
  const loop = (array) => {
    array.forEach(item => {
      const newItem = Object.assign({}, item);
      delete newItem[childrenName];
      result.push(newItem);
      if (item[childrenName] && item[childrenName].length > 0) {
        loop(item[childrenName]);
      }
    });
  };
  loop(data);
  return result;
}
//---------------引用FE-Driver/vue-beauty的utils--------------------
const toString = Object.prototype.toString

// 返回vue匹配的props的对象
export function defaultProps (props) {
  for (const i in props) {
    if (props.hasOwnProperty(i)) {
      let defaultValue = props[i]

      // 支持String， Number等类型
      if (defaultValue && defaultValue.name && window[defaultValue.name] === defaultValue) {
        props[i] = {
          type: defaultValue,
          default: null
        }

        continue
      }

      let type = toString.call(defaultValue).replace('[object ', '').replace(']', '')

      // 如果传进来的是vue的原生props对象的话
      if (type === 'Object') {
        if (defaultValue.type != null ||
            defaultValue.default != null ||
            defaultValue.validator != null ||
            defaultValue.twoWay != null ||
            defaultValue.required != null) {
          continue
        }
      }

      // 支持 Object和Array的简洁声明方式
      // Todo: 目前看来这样并没有什么卵用
      if (type === 'Array' || type === 'Object') {
        props[i] = {
          type: window[type],
          default: function () {
            return defaultValue
          }
        }
        continue
      }

      props[i] = {
        type: window[type],
        default: defaultValue
      }
    }
  }

  return props
}

export function oneOfType (validList, defaultValue) {
  let validaObj = {}

  validaObj.default = defaultValue
  validaObj.validator = function (value) {
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      const currentValid = validList[j]
      let validName
      if (typeof currentValid === 'string') {
        validName = currentValid
      } else {
        validName = currentValid.name
      }
      if (toString.call(value).indexOf(validName) > -1) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export function oneOf (validList, defaultValue) {
  let validaObj = {}

  validaObj.default = defaultValue
  validaObj.validator = function (value) {
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      if (value === validList[j]) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export const any = {
  validator: function (value) {
    return true
  }
}


