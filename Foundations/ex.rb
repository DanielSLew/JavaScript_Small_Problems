require 'pry'

def longest(s)
  tmp = "" 
  result = s.chars.map do |ch|
    if tmp.empty? || ch >= tmp[-1]
      tmp += ch
    else
      tmp = ch
    end

    tmp
  end
  p result
  result.max_by(&:size)
end

longest('abcdeapb')

a = ''

'hello'.chars.map do |c|
  a += c
end


