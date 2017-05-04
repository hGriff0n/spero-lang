
$(document).ready(function () {
  /*
   * This stuff is carried over from the Uno framework that I built this site on top of
   */
  $('a.blog-button').click(function (e) {
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
    currentWidth = $('.panel-cover').width()

    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
  })
  $('.panel-cover').addClass('panel-cover--collapsed')

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })


  /*
   * This section was added to implement moving pages (TODO)
   */
  var cur_page = $('#demo-page');
  var cur_btn = $('#demo');

  var addSwitchClick = function(btn, page) {
    btn.click(function() {
      if (!btn.hasClass('vis-pg')) {
        cur_page.hide();
        page.show();

        cur_btn.removeClass('vis-pg');
        btn.addClass('vis-pg');

        cur_page = page;
        cur_btn = btn;
      }
    })

    // Initially hide all pages
    page.hide();
  }

  // Add the javascript call backs for the buttons and hide the pages
  addSwitchClick($('#demo'), $('#demo-page'));
  addSwitchClick($('#feat'), $('#feat-page'));
  addSwitchClick($('#tutr'), $('#tutr-page'));

  // Display the current page
  cur_btn.click();
})

function calculatorDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#sc").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`# This code is editable and runnable!
mod spero:demo

def main = () -> {
    # \`+\` or \`-\` means add or subtract by 1
    # \`*\` or \`/\` means multiply or divide by 2

    let program = "+ + * - /";
    let acc = mut 0;

    for char in program do
        char.match {
            case '+' -> acc += 1
            case '-' -> acc -= 1
            case '*' -> acc *= 2
            case '/' -> acc /= 2
            case _ -> ()
        }

    "The program \"{}\" evaluates to {}"
        .std:io:println(program, acc)
}`);
}

function helloWorldDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#hw").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`use std:io:println as puts
def main = () -> "Hello, World!".puts

## println gets rebound to the name \`puts\` to cut down
on the typing, although that's not explicitly needed ##`)
}

function palindromeDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#ep").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`# Determine whether the given number is a palindrome
def palindrome? = (n :: Size) -> {
    let n = mut n.toStr.split(n.len / 2)

    # Extend the string if the original had odd length
    if n(0).size != n(1).size
      n(0) += n(1)(0)

    # Compare the two substrings against each other
    n(0).zipWith(n(1).reverse).reduce(
        (b, a) -> b && a.0 == a.1, true)
}

# Find the largest palindrome made by multiplying 3-digit numbers
def main = () -> {
  let max = 999 * 999
  let min = 111 * 111

  "{}".std:io:println({max..min}.findIf(palindrome?))
}`);
}

function insertionSortDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#is").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`def insertionSort![T :: Comparable] =
  (list :: mut Indexable[T, Size]) -> {
    use LType as Indexable[T, Size]

    let impl = (list :: mut LType&, l :: Size, r :: Size) -> {
        # Partition the array
        for i in 1..{r - 1} do {
          let min = mut j;
          for i in {j + 1}..list.size
            if list(i) < list(min) min = i
        }

        # Swap the partition if necessary
        list.swap(i, j).if min != j
    }
    
    impl(list, 0, list.size)
    list
}

def main = () ->
    "{}".std:io:println([ 3, 2, 5, 4 ].insertionSort!)`);
}

function erasthosenesDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#se").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`# Basic Sieve of Erasthosenes
let genPrimes = (max :: Size) ->{
    static primes = mut [2].Vector[Size]

    let cur_prime = mut primes.back
    while cur_prime < max {
        # A bit inefficient for the moment
        cur_prime += 1
        let is_prime = primes.reduce(
            (b, p) -> b || cur_prime % p == 0, false)

        primes.pushBack(cur_prime).if is_prime
    }

    return primes
}

# Show all primes smaller than 100
def main = () -> "{}".std:io:println(genPrimes(100))`);
}

function customTypeDemo() {
  $("#demo-list > li").removeClass('curr-list-item');
  $("#ct").addClass('curr-list-item');

  ace.edit("editor").session.setValue(`use std:io:_

def Foo = (s :: String) {
    let count = mut 0
    "{} is a baz!".println(s)

    # This is a mutable method
    def inc = mut () -> count += 1
    def performBar = () ->
        "This is not a mutable method!".println

    def drop = mut () -> "Incremented {} times!".println(count)
}

def main = () -> {
    let f = "Carson".Foo
    # f.inc; f.inc          Error as f isn't mutable

    let f = mut f
    f.inc; f.inc
}`);
}

function setupDefaultDemoSnippet() {
  calculatorDemo();
}