/* globals Two $ */

var lib = {}

;(function (ns) {
  ns.Circuit = function (I1, I2, I3, I4, I5) {
    var circuit = {
      I1: I1,
      I2: I2,
      I3: I3,
      I4: I4,
      I5: I5,

      // Update circuit variables
      update: function () {
        circuit.I6 = circuit.I1 + circuit.I2 + circuit.I3 + circuit.I4 + circuit.I5

        return circuit
      }
    }

    circuit.update()

    return circuit
  }

  ns.makeArrowhead = function (two, length, x, y, theta, lwidth) {
    var horizontalArrowhead = two.makeLine(0, 0, length, 0)

    horizontalArrowhead.linewidth = lwidth

    var verticalArrowhead = two.makeLine(0, 0, 0, length)

    verticalArrowhead.linewidth = lwidth

    var rectangle = two.makeRectangle(0, 0, 2 * length, 2 * length)

    rectangle.opacity = 0

    var arrowhead = two.makeGroup(horizontalArrowhead, verticalArrowhead, rectangle)

    arrowhead.translation.set(x, y)

    arrowhead.rotation = (Math.PI / 180) * theta

    arrowhead.forward = 1

    arrowhead.flip = function () {
      arrowhead.rotation += Math.PI

      arrowhead.forward *= -1
    }

    return arrowhead
  }

  ns.runApp = function (canvasElem) {
    var width1 = 650
    var height1 = 650
    var two = new Two({ type: Two.Types.svg, width: width1, height: height1 }).appendTo(canvasElem)

    /* Make 6 lines for branches. These must insersect at a point*/

    two.makeLine(0, 0, two.width / 2, two.height / 2)

    two.makeLine(0, two.height / 2, two.width / 2, two.height / 2)

    two.makeLine(0, two.height, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height / 2, two.width, two.height / 2)

    two.makeLine(width1 / 2, 0, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height, two.width / 2, two.height / 2)

    var arrowheadLength = 10

    var linewidth = 1.5

    // southeast arrow:

    var southeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 180, linewidth)

    // left east arrow

    var leftEastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 135, linewidth)

    // northeast arrow

    var northeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 90, linewidth)

    // south arrow top

    var southArrowTop = ns.makeArrowhead(two, arrowheadLength, two.width / 2, two.height / 4, 225, linewidth)

    // north arrow bottom

    var northArrowBottom = ns.makeArrowhead(two, arrowheadLength, two.width / 2, 3 * two.height / 4, 45, linewidth)

    // east arrow right

    var eastArrowRight = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 135, linewidth)

    two.update()

    // hide all arrows pointing away from the node

    var arrows =
    [southeastArrow,
    leftEastArrow,
    northeastArrow,
    northArrowBottom,
    southArrowTop,
    eastArrowRight]

    for (var i = 0; i < arrows.length - 1; i++) {
      var element = arrows[i]._renderer.elem

      $(element).hover(
        function () {
          $(this).addClass('arrows > path')
        }, function () {
        $(this).removeClass('arrows > path')
      }
      )

      ;(function (i) {
        $(element).on('click', function () {
          arrows[i].flip()
          two.update()
        })
      })(i)
    }

    $('#labelI1').css('top', (two.height / 4.4) + 'px')
                 .css('left', (two.width / 21.3) + 'px')

    $('#labelI2').css('top', (two.height / 1.9) + 'px')
                 .css('left', (two.width / 5) + 'px')

    $('#labelI3').css('top', (3 * two.height / 4.04) + 'px')
                 .css('left', (two.width / 21) + 'px')

    $('#labelI4').css('top', (3 * two.height / 4.04) + 'px')
                 .css('left', (two.width / 1.86) + 'px')

    $('#labelI5').css('top', (two.height / 4.4) + 'px')
                 .css('left', (two.width / 1.86) + 'px')

    $('#labelI6').css('top', (two.height / 1.9) + 'px')
                 .css('left', (3 * two.width / 4) + 'px')

    $('#labelI6').append(this.circuit.I6.toPrecision(2))

  }
})(lib)
