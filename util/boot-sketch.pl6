#! /usr/bin/perl6
use v6;

role Tag {
  has Str $.tag    = 'div';
  has Str @.classes;
  has Tag @.elements handles<push>;

  method begin(Int $indent) {
    "{ ' ' x $indent }<$!tag class='@.classes[]'>\n";
  }

  method finish(Int $indent) {
    "{ ' ' x $indent }</$!tag>\n";
  }

  method text(Int $indent = 0) {
    self.begin($indent)
    ~ (
      [~] gather for @.elements { take $_.text($indent + 2) }
    )
    ~ self.finish($indent);
  }
}

sub MAIN (*@elements) {
  my @tag-stack = Tag.new( :tag<body> );
  my @container-stack;

  for @elements -> $element {

    given $element {

      when 'container' {
        say "container";
        my $container = Tag.new( :tag<div>, :classes<container> );
        if my $parent-container = @tag-stack.reverse.first: *.classes.first(/col/)  {
          $parent-container.push: $container;
        }
        elsif @tag-stack[*-1].tag eq 'body' {
          @tag-stack[*-1].push: $container;
        }
        @container-stack.push: $container;
        @tag-stack.push: $container;
      }

      when 'row' {
        say "row";
        my $row = Tag.new( :tag<div>, :classes<row> );
        if my $parent-container = @tag-stack.reverse.first: *.classes.first('container') {
          $parent-container.push: $row;
        }
        else {
          die "Unable to attatch row to container!";
        }
        @tag-stack.push: $row;
      }

      when m/col/ {
        my $class = "col-{ $_.comb( /\d+/ ).join('') }";
        say $class;
        my $col = Tag.new( :tag<div>, :classes($class) );
        if my $parent-row = @tag-stack.reverse.first: *.classes.first('row') {
          $parent-row.push: $col;
        }
        else {
          die "Unable to attatch column to row!";
        }
        @tag-stack.push: $col;
      }

      when '..' {
        say 'Stepping up container';
        @container-stack.pop if @container-stack;
        @tag-stack.push: @container-stack[*-1];
      }

      default {
        say "'$_' is not handled!";
      }

    }

  }

  say @tag-stack[0].text;

}
