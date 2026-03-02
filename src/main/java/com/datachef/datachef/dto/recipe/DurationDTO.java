package com.datachef.datachef.dto.recipe;


public record DurationDTO(
        short minutes,
        short hours
) {
    public static DurationDTO durationFromMinute(Short totalMinutes){
        if (totalMinutes == null) return new DurationDTO((short) 0, (short) 0);

        return new DurationDTO((short) (totalMinutes / 60), (short) (totalMinutes % 60));
    }

    public static Short minuteFromDuration(DurationDTO duration){
        if (duration == null) return 0;
        int time = duration.minutes() + duration.hours() * 60;
        return (short) time;
    }
}
