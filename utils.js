const Cosmai = {
    Validations: {
      isEmpty: (value) => {
        return value == undefined || value == null;
      },
      isBoolean: (value) => {
        return new String(value).toUpperCase() === 'TRUE' || value.toString().toUpperCase() === 'FALSE'
      },
      isArray: (value) => {
        return Array.isArray(value);
      },
      isDateOrDateTime: (value) => {
        switch (typeof value) {
          case 'number':
            return true;
          case 'string':
            return !isNaN(Date.parse(value));
          case 'object':
            if (value instanceof Date) {
              return !isNaN(value.getTime());
            }
          default:
            return false;
        }
      },
      isNumber: (value) => {
        return !(parseFloat(value) == NaN);
      },
      isInteger: (value) => {
        return !(parseInt(value) == NaN)
      },
      isString: (value) => {
        return !(value == null || value == undefined || typeof value == object || Array.isArray(value))
      },
      isObject: (value) => {
        return typeof value == 'object';
      },
      Utils: {
        isCEP: (value) => {
  
          const clearMask = (value) => {
            let newValue = value;
            let chars = '/\-_.,;[]():';
            chars.split('').forEach(c => { newValue = newValue.split(c).join(''); });
            return newValue;
          };
  
          const isEmptyValueForMask = (value) => {
            return !value || (value && clearMask(value) === '');
          };
  
          if (isEmptyValueForMask(value)) return true;
  
          return (
            /^[0-9]{5}-[0-9]{3}$/.test(value) || /^[0-9]{8}$/.test(clearMask(value))
          );
  
        },
        isCPF: (value) => {
          const clearMask = (value) => {
            let newValue = value;
            let chars = '/\-_.,;[]():';
            chars.split('').forEach(c => { newValue = newValue.split(c).join(''); });
            return newValue;
          };
  
          const isEmptyValueForMask = (value) => {
            return !value || (value && clearMask(value) === '');
          };
  
          if (isEmptyValueForMask(value)) return true;
  
          const mod11 = (num) => num % 11;
          const isEqual = (a) => (b) => b === a;
          const mergeDigits = (num1, num2) => `${num1}${num2}`;
          const getTwoLastDigits = (cpf) => `${cpf[9]}${cpf[10]}`;
          const getCpfNumeral = (cpf) => cpf.substr(0, 9).split('');
  
          const isRepeatingChars = (str) =>
            str.split('').every((elem) => elem === str[0]);
  
          const toSumOfProducts = (multiplier) => (result, num, i) =>
            result + num * multiplier--;
  
          const getSumOfProducts = (list, multiplier) =>
            list.reduce(toSumOfProducts(multiplier), 0);
  
          const getValidationDigit = (multiplier) => (cpf) =>
            getDigit(mod11(getSumOfProducts(cpf, multiplier)));
  
          const getDigit = (num) => (num > 1 ? 11 - num : 0);
  
          const isValidCPF = (_cpf) => {
            /^\((10)|([1-9][1-9])\)[2-9][0-9]{3}-[0-9]{4}$/.test(value.trim());
            const cpf = _cpf.replace(/\D+/g, '');
            const CPF = getCpfNumeral(cpf);
            const firstDigit = getValidationDigit(10)(CPF);
            const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit));
            return (
              isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit)) &&
              !isRepeatingChars(cpf)
            );
          };
  
          const validate = (CPF) => isValidCPF(CPF);
  
          return validate(clearMask(value));
  
        },
        isCNPJ: (value) => {
          const clearMask = (value) => {
            let newValue = value;
            let chars = '/\-_.,;[]():';
            chars.split('').forEach(c => { newValue = newValue.split(c).join(''); });
            return newValue;
          };
  
          const isEmptyValueForMask = (value) => {
            return !value || (value && clearMask(value) === '');
          };
  
          if (isEmptyValueForMask(cnpj)) return true;
  
          const onlyNumbers = (str) => str.match(/[0-9]/g).join('');
          const isRepeatingChars = (str) =>
            str.split('').every((elem) => elem === str[0]);
  
          const Soma = (cnpj, size) => {
            let soma = 0;
            let pos = size - 7;
            for (let i = size; i >= 1; i--) {
              soma += parseInt(cnpj.substring(0, size).charAt(size - i)) * pos--;
              if (pos < 2) pos = 9;
            }
            return soma;
          };
  
          const result = (cnpj, base) =>
            Soma(cnpj, base) % 11 < 2 ? 0 : 11 - (Soma(cnpj, base) % 11);
          const digits = (cnpj) => cnpj.substring(12);
  
          const isValidCNPJ = (cnpj) => {
            const CNPJ = onlyNumbers(cnpj);
            return (
              CNPJ !== '' &&
              CNPJ.length === 14 &&
              parseInt(result(CNPJ, 12)) === parseInt(digits(CNPJ).charAt(0)) &&
              parseInt(result(CNPJ, 13)) === parseInt(digits(CNPJ).charAt(1)) &&
              !isRepeatingChars(CNPJ)
            );
          };
  
          const validate = (CNPJ) => isValidCNPJ(CNPJ);
  
          return validate(clearMask(value));
        },
        isPhoneNumber: (value) => {
          if (!value) return true;
  
          return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(
            value.replace(/\D+/g, ''),
          );
        },
        isEmail: (value) => {
          const stringToRegex = str => {
            const main = str.match(/\/(.+)\/.*/)[1];
            const options = str.match(/\/.+\/(.*)/)[1];
            return new RegExp(main, options);
          }
  
          if (!value) return true;
          /* eslint-disable */
          return stringToRegex('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i').test(value);
        },
        isHTTPUrl: (value) => {
          var pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
          return pattern.test(value);
        }
      },
      Array: {
        isEmpty: (value) => {
          return value == undefined || value == null || value.length <= 0;
        },
        isBlank: (value) => {
          return value == [] || value.length <= 0;
        },
        isEmptyOrBlank: (value) => {
          return value == undefined || value == null || value == [] || value.length <= 0;
        }
      },
      String: {
        isEmpty: (value) => {
          return value == undefined || value == null;
        },
        isBlank: (value) => {
          return value == '';
        },
        isEmptyOrBlank: (value) => {
          return value == undefined || value == null || value == '';
        }
      },
      Object: {
        hasAttribute: (value, attribute) => {
          return new Object(value).hasOwnProperty(attribute);
        }
      }
    },
    Number: {
      round: (value, places) => {
        if (!num || !places) return num;
        try {
          return parseFloat(num).toFixed(places);
        } catch {
          return num;
        }
      },
    },
    DateTime: {
      dateAdd: (date, interval, units, format) => {
  
        const isValidDate = (input) => {
          return typeof input.getMonth === 'function';
        }
  
        const joinObj = (obj, seperator) => {
          var out = [];
          for (k in obj) {
            out.push(k);
          }
          return out.join(seperator);
        }
  
  
        const CountryCodeToDateFormat = (countryInput) => {
  
          var countryFormatType = {
            default: 'YYYY-MM-DD',
            ISO8601: 'YYYY-MM-DD',
            INTERNATIONAL: 'YYYY-MM-DD',
            USA: 'M/d/yyyy',
            GBR: 'd MMMM yyyy',
            NLD: 'dd-MM-yyyy',
            CHN: 'yy年MM月dd日'
          }
  
          if (!countryInput) {
            countryInput = "default";
          }
          if (!(countryInput in countryFormatType)) {
            return countryInput;
          }
  
          var countryMatchRegex = joinObj(countryFormatType, "|");
          var regEx = new RegExp(countryMatchRegex, "g");
          countryInput = countryInput.replace(regEx, function (countryCode) {
            return countryFormatType[countryCode];
          });
  
          return countryInput;
        }
  
  
        const DateToString = (inDate, formatString) => {
          if (!isValidDate(inDate)) {
            inDate = new Date(inDate);
          }
          formatString = CountryCodeToDateFormat(formatString);
  
          let dateObject = {
            M: inDate.getMonth() + 1,
            d: inDate.getDate(),
            D: inDate.getDate(),
            h: inDate.getHours(),
            m: inDate.getMinutes(),
            s: inDate.getSeconds(),
            y: inDate.getFullYear(),
            Y: inDate.getFullYear()
          };
  
          let dateMatchRegex = joinObj(dateObject, "+|") + "+";
          let regEx = new RegExp(dateMatchRegex, "g");
          formatString = formatString.replace(regEx, function (formatToken) {
            let datePartValue = dateObject[formatToken.slice(-1)];
            let tokenLength = formatToken.length;
  
            if (formatToken.indexOf('y') < 0 && formatToken.indexOf('Y') < 0) {
              let tokenLength = Math.max(formatToken.length, datePartValue.toString().length);
            }
            let zeroPad = (datePartValue.toString().length < formatToken.length ? "0".repeat(tokenLength) : "");
            return (zeroPad + datePartValue).slice(-tokenLength);
          });
  
          return formatString;
        }
  
  
        let ret = date === null ? new Date() : new Date(date);
        let checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
        switch (String(interval).toLowerCase()) {
          case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
          case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
          case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
          case 'week': ret.setDate(ret.getDate() + 7 * units); break;
          case 'day': ret.setDate(ret.getDate() + units); break;
          case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
          case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
          case 'second': ret.setTime(ret.getTime() + units * 1000); break;
          default: ret = undefined; break;
        }
        return format === null ? DateToString(ret, "yyyy-MM-ddTHH:mm:ss") : DateToString(ret, format);
      }
    },
    Url: {
      encode: (value) => {
        return encodeURI(value);
      },
      decode: (value) => {
        return decodeURI(value);
      }
    },
    Base64: {
      encode: (value) => {
        try {
          let buff = new Buffer(value, 'utf-8');
          return buff.toString('base64');
        }
        catch {
          return btoa(value);
        }
      },
      decode: (value) => {
        try {
          let buff = new Buffer(value, 'base64');
          return buff.toString('ascii');
  
        }
        catch {
          return atob(value);
        }
      }
    },
    String: {
      trim: (value) => {
        return new String(value).trim();
      },
      trimLeft: (value) => {
        return new String(value).trimStart();
      },
      trimRight: (value) => {
        return new String(value).trimEnd();
      },
      padEnd: (value, maxLength, charPad) => {
        return new String(value).padEnd(maxLength, charPad);
      },
      padStart: (value, maxLength, charPad) => {
        return new String(value).padStart(maxLength, charPad);
      },
      getLength: (value) => {
        return value == undefined || value == null || value == '' || value.length <= 0 ? 0 : value.length;
      },
      truncate: (value, length) => {
        return value.length > length ? str.substr(0, length) + '...' : value;
      },
      firstCaptalize: (value) => {
        if (!value || typeof value != 'string') return '';
        if (value == ' ') return value;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      capitalize: (value) => {
        const firstCapitalize = (val) => {
          if (!val || typeof val != 'string') return '';
          if (val == ' ') return val;
          return val.charAt(0).toUpperCase() + val.slice(1);
        }
        return value.split(' ').map(word => firstCapitalize(word)).join(' ');
      },
      upperCase: (value) => {
        return value.toUpperCase();
      },
      lowerCase: (value) => {
        return value.toLowerCase();
      },
      replace: (value, source, target) => {
        return value ? value.toString().split(source).join(target) : '';
      },
      clearMask: (value, characters) => {
        let newValue = value;
        let chars = characters = !characters || characters == '' ? '/\-_.,;[]():' : characters;
        chars.split('').forEach(c => { newValue = newValue.split(c).join(''); });
        return newValue;
      }
    },
    Array: {
      getLength: (value) => {
        return value == undefined || value == null || value == '' || value.length <= 0 ? 0 : value.length;
      }
    }
  };