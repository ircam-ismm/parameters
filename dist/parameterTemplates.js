'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var min = Math.min;
var max = Math.max;

function clip(value) {
  var lower = arguments.length <= 1 || arguments[1] === undefined ? -Infinity : arguments[1];
  var upper = arguments.length <= 2 || arguments[2] === undefined ? +Infinity : arguments[2];

  return max(lower, min(upper, value));
}

/**
 *
 *
 */
exports.default = {
  boolean: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'boolean') throw new Error('Invalid value for boolean param "' + name + '": ' + value);

      return value;
    }
  },
  integer: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (!(typeof value === 'number' && Math.floor(value) === value)) throw new Error('Invalid value for integer param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },
  float: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'number' || value !== value) // reject NaN
        throw new Error('Invalid value for float param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },
  string: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'string') throw new Error('Invalid value for string param "' + name + '": ' + value);

      return value;
    }
  },
  enum: {
    definitionTemplate: ['default', 'list'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (definition.list.indexOf(value) === -1) throw new Error('Invalid value for enum param "' + name + '": ' + value);

      return value;
    }
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFtZXRlclRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6WyJtaW4iLCJNYXRoIiwibWF4IiwiY2xpcCIsInZhbHVlIiwibG93ZXIiLCJJbmZpbml0eSIsInVwcGVyIiwiYm9vbGVhbiIsImRlZmluaXRpb25UZW1wbGF0ZSIsInR5cGVDaGVja0Z1bmN0aW9uIiwiZGVmaW5pdGlvbiIsIm5hbWUiLCJFcnJvciIsImludGVnZXIiLCJmbG9vciIsImZsb2F0Iiwic3RyaW5nIiwiZW51bSIsImxpc3QiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxLQUFLRCxHQUFqQjtBQUNBLElBQU1FLE1BQU1ELEtBQUtDLEdBQWpCOztBQUVBLFNBQVNDLElBQVQsQ0FBY0MsS0FBZCxFQUEyRDtBQUFBLE1BQXRDQyxLQUFzQyx5REFBOUIsQ0FBQ0MsUUFBNkI7QUFBQSxNQUFuQkMsS0FBbUIseURBQVgsQ0FBQ0QsUUFBVTs7QUFDekQsU0FBT0osSUFBSUcsS0FBSixFQUFXTCxJQUFJTyxLQUFKLEVBQVdILEtBQVgsQ0FBWCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7a0JBSWU7QUFDYkksV0FBUztBQUNQQyx3QkFBb0IsQ0FBQyxTQUFELENBRGI7QUFFUEMscUJBRk8sNkJBRVdOLEtBRlgsRUFFa0JPLFVBRmxCLEVBRThCQyxJQUY5QixFQUVvQztBQUN6QyxVQUFJLE9BQU9SLEtBQVAsS0FBaUIsU0FBckIsRUFDRSxNQUFNLElBQUlTLEtBQUosdUNBQThDRCxJQUE5QyxXQUF3RFIsS0FBeEQsQ0FBTjs7QUFFRixhQUFPQSxLQUFQO0FBQ0Q7QUFQTSxHQURJO0FBVWJVLFdBQVM7QUFDUEwsd0JBQW9CLENBQUMsU0FBRCxDQURiO0FBRVBDLHFCQUZPLDZCQUVXTixLQUZYLEVBRWtCTyxVQUZsQixFQUU4QkMsSUFGOUIsRUFFb0M7QUFDekMsVUFBSSxFQUFFLE9BQU9SLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJILEtBQUtjLEtBQUwsQ0FBV1gsS0FBWCxNQUFzQkEsS0FBckQsQ0FBSixFQUNFLE1BQU0sSUFBSVMsS0FBSix1Q0FBOENELElBQTlDLFdBQXdEUixLQUF4RCxDQUFOOztBQUVGLGFBQU9ELEtBQUtDLEtBQUwsRUFBWU8sV0FBV1gsR0FBdkIsRUFBNEJXLFdBQVdULEdBQXZDLENBQVA7QUFDRDtBQVBNLEdBVkk7QUFtQmJjLFNBQU87QUFDTFAsd0JBQW9CLENBQUMsU0FBRCxDQURmO0FBRUxDLHFCQUZLLDZCQUVhTixLQUZiLEVBRW9CTyxVQUZwQixFQUVnQ0MsSUFGaEMsRUFFc0M7QUFDekMsVUFBSSxPQUFPUixLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxVQUFVQSxLQUEzQyxFQUFrRDtBQUNoRCxjQUFNLElBQUlTLEtBQUoscUNBQTRDRCxJQUE1QyxXQUFzRFIsS0FBdEQsQ0FBTjs7QUFFRixhQUFPRCxLQUFLQyxLQUFMLEVBQVlPLFdBQVdYLEdBQXZCLEVBQTRCVyxXQUFXVCxHQUF2QyxDQUFQO0FBQ0Q7QUFQSSxHQW5CTTtBQTRCYmUsVUFBUTtBQUNOUix3QkFBb0IsQ0FBQyxTQUFELENBRGQ7QUFFTkMscUJBRk0sNkJBRVlOLEtBRlosRUFFbUJPLFVBRm5CLEVBRStCQyxJQUYvQixFQUVxQztBQUN6QyxVQUFJLE9BQU9SLEtBQVAsS0FBaUIsUUFBckIsRUFDRSxNQUFNLElBQUlTLEtBQUosc0NBQTZDRCxJQUE3QyxXQUF1RFIsS0FBdkQsQ0FBTjs7QUFFRixhQUFPQSxLQUFQO0FBQ0Q7QUFQSyxHQTVCSztBQXFDYmMsUUFBTTtBQUNKVCx3QkFBb0IsQ0FBQyxTQUFELEVBQVksTUFBWixDQURoQjtBQUVKQyxxQkFGSSw2QkFFY04sS0FGZCxFQUVxQk8sVUFGckIsRUFFaUNDLElBRmpDLEVBRXVDO0FBQ3pDLFVBQUlELFdBQVdRLElBQVgsQ0FBZ0JDLE9BQWhCLENBQXdCaEIsS0FBeEIsTUFBbUMsQ0FBQyxDQUF4QyxFQUNFLE1BQU0sSUFBSVMsS0FBSixvQ0FBMkNELElBQTNDLFdBQXFEUixLQUFyRCxDQUFOOztBQUVGLGFBQU9BLEtBQVA7QUFDRDtBQVBHO0FBckNPLEMiLCJmaWxlIjoicGFyYW1ldGVyVGVtcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBtaW4gPSBNYXRoLm1pbjtcbmNvbnN0IG1heCA9IE1hdGgubWF4O1xuXG5mdW5jdGlvbiBjbGlwKHZhbHVlLCBsb3dlciA9IC1JbmZpbml0eSwgdXBwZXIgPSArSW5maW5pdHkpIHtcbiAgcmV0dXJuIG1heChsb3dlciwgbWluKHVwcGVyLCB2YWx1ZSkpXG59XG5cbi8qKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYm9vbGVhbjoge1xuICAgIGRlZmluaXRpb25UZW1wbGF0ZTogWydkZWZhdWx0J10sXG4gICAgdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBib29sZWFuIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuICBpbnRlZ2VyOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKCEodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGludGVnZXIgcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiBjbGlwKHZhbHVlLCBkZWZpbml0aW9uLm1pbiwgZGVmaW5pdGlvbi5tYXgpO1xuICAgIH1cbiAgfSxcbiAgZmxvYXQ6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fMKgdmFsdWUgIT09IHZhbHVlKSAvLyByZWplY3QgTmFOXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgZmxvYXQgcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiBjbGlwKHZhbHVlLCBkZWZpbml0aW9uLm1pbiwgZGVmaW5pdGlvbi5tYXgpO1xuICAgIH1cbiAgfSxcbiAgc3RyaW5nOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3Igc3RyaW5nIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuICBlbnVtOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnLCAnbGlzdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5saXN0LmluZGV4T2YodmFsdWUpID09PSAtMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBlbnVtIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==