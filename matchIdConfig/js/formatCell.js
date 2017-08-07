import moment from 'moment'
import {diffChars} from 'diff'
import {coloredDiff, brDiff} from '../../src/assets/js/formatCell'

export default {coloredDiff, brDiff, formatSexe, formatDiff, formatLieu, formatDistance, formatRang, parseComment, formatDate}

function formatDiff (value) {
  if (value === undefined) return ''

  let splittedDiff = value.split(' <> ', 2).map((v) => v.trim())

  return splittedDiff[1] ? coloredDiff(splittedDiff[0], splittedDiff[1]) : value
}

function formatSexe (x, y) {
  return coloredDiff(sexeConvertor(x), sexeConvertor(y))
}

function sexeConvertor (value) {
  if (value === '1') return 'H'
  return 'F'
}

function formatLieu (value) {
  let splittedLieu = value.split(' <> ')

  if (splittedLieu[0] === splittedLieu[1]) {
    return splittedLieu[0]
  }

  return formatDiff(value)
}

function formatDistance (value) {
  if (typeof value === 'undefined' || Number(value) === 0 || value === 'NaN') {
    return ''
  }

  if (value < 10) {
    return value + ' km'
  }

  return Math.round(value) + ' km'
}

function formatRang (value) {
  return Number(value) === 1 ? '' : '<span class="icon"><i class="fa fa-exclamation-triangle has-text-danger"></i></span>'
}

function parseComment (value) {
  let res = JSON.parse(value)
  let ros = ''

  res.forEach(function (element, index, array) {
    if (index === array.length - 1) {
      ros += element
    } else {
      ros += element + '<br/>'
    }
  })

  return ros
}

function formatDate (value) {
  return moment(value, 'DD/MM/YYYY').format('DD-MM-YYYY')
}
