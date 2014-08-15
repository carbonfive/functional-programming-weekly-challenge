require 'celluloid'

class SentencePairs
  SEPARATORS = /[.!?]/

  def top_pairings(path)
    pairs = Hash.new { |h, k| h[k] = 0 }
    partial_sentence = ''

    File.new(path).each_line do |line|
      sentences, partial_sentence = parse_line(line, partial_sentence)

      sentence_pairs = sentences.map { |sentence| extract_pairs(sentence) }
      sentence_pairs.flatten.each { |pair| pairs[pair] += 1 }
    end

    pairs.sort_by { |pair| -pair[1] }.take(3).map { |pair| pair[0].split('.') }
  end

  def parse_line(line, partial_sentence)
    sentences = []
    terminator_index = line.index(SEPARATORS)

    if terminator_index
      before_terminator = line[0..terminator_index - 1]
      sentences += [partial_sentence + before_terminator]
      partial_sentence = line[terminator_index + 1..-1]
      sub_sentences, partial_sentence = parse_line(partial_sentence, '')
    else
      return [[], partial_sentence + line]
    end

    [sentences + sub_sentences, partial_sentence]
  end

  def extract_pairs(sentence)
    words = sentence.downcase.split(/[,;:\-\s"]+/).uniq.select { |word| word.size > 0 }

    words.combination(2).map do |pair|
      pair.sort.join('.')
    end
  end
end

module Parallel
  class SentencePairs
    def top_pairings(path)
      # pairs = Hash.new { |h, k| h[k] = 0 }
      partial_sentence = ''
      # line_parser = LineParser.pool
      sentence_parser = SentenceParser.pool
      collector = Collector.new
      # result = nil
      full_sentences = []

      File.new(path).each_line do |line|
        sentences = line.split(/[.!?]/)

        new_partial_sentence = sentences[-1]

        if sentences.size > 1
          first_sentence = partial_sentence + sentences.first
          other_sentences = sentences[1..-2]
          # full_sentences = full_sentences + [first_sentence] + other_sentences

          full_sentences = [first_sentence] + other_sentences
          full_sentences.each { |sentence| sentence_parser.async.parse(sentence, collector) }

          partial_sentence = new_partial_sentence
        else
          partial_sentence += new_partial_sentence
        end

        # if result
        #   sentences, partial_sentence = result.value
        #   s += sentences
        # end

        # result = line_parser.future.parse(line, partial_sentence)
      end

      collector
    end
  end

  class LineParser
    include Celluloid

    def parse(line, partial_sentence)
      sentences = []
      terminator_index = line.index(/[.!?]/)

      if terminator_index
        before_terminator = line[0..terminator_index - 1]
        sentences += [partial_sentence + before_terminator]
        partial_sentence = line[terminator_index + 1..-1]
        sub_sentences, partial_sentence = parse(partial_sentence, '')
      else
        return [[], partial_sentence + line]
      end

      [sentences + sub_sentences, partial_sentence]
    end
  end

  class SentenceParser
    include Celluloid

    def parse(sentence, collector)
      words = sentence.downcase.split(/[,;:\-\s"]+/).uniq.select { |word| word.size > 0 }

      pairs = words.combination(2).map { |pair| pair.sort.join('.') }
      collector.add(pairs)
    end
  end

  class Collector
    include Celluloid

    attr_reader :pairs

    def initialize
      @pairs = Hash.new { |h, k| h[k] = 0 }
    end

    def add(new_pairs)
      new_pairs.each { |pair| pairs[pair] += 1 }
    end

    def top
      pairs.sort_by { |pair| -pair[1] }.take(3).map { |pair| pair[0].split('.') }
    end
  end
end
