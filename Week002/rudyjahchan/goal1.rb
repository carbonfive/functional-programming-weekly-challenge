def g(tail=nil)
  if tail
    "g#{tail}"
  else
    Class.new(String) do
      def o(tail='')
        self.class.new(self + 'o' + tail)
      end
    end.new 'g'
  end
end
