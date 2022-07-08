/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, ReactNode, useState } from 'react';

type timelineContextType = {
  timelineStart: any;
  timelineEnd: any;
  handleTimelineStart: (value: any) => void;
  handleTimelineEnd: (value: any) => void;
};

const timelineContextDefaultValues: timelineContextType = {
  timelineStart: null,
  timelineEnd: null,
  handleTimelineStart: async () => {},
  handleTimelineEnd: async () => {},
};

const TimelineContext = createContext<timelineContextType>(
  timelineContextDefaultValues,
);

export function useTimelineMenu() {
  return useContext(TimelineContext);
}

type Props = {
  children: ReactNode;
};

export function TimelineMenuProvider({ children }: Props) {
  const [timelineStart, setTimelineStart] = useState<any>(null);
  const [timelineEnd, setTimelineEnd] = useState<any>(null);

  const handleTimelineStart = (value: any) => {
    setTimelineStart(value);
  };

  const handleTimelineEnd = (value: any) => {
    setTimelineEnd(value);
  };

  const contextProps = {
    timelineStart,
    timelineEnd,
    handleTimelineStart,
    handleTimelineEnd,
  };

  return (
    <>
      <TimelineContext.Provider value={contextProps}>
        {children}
      </TimelineContext.Provider>
    </>
  );
}
