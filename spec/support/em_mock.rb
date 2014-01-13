module EM
  def self.next_tick(&block)
    block.call if block.respond_to?(:call)
  end
  class PeriodicTimer
    def initialize(interval)
      @interval = interval
    end
  end
end
