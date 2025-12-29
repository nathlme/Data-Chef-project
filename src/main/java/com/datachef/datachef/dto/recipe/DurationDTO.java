package com.datachef.datachef.dto.recipe;

public record DurationDTO(
        Integer minutes,
        Integer hours
) {
    public static DurationDTO durationFromMinute(Short totalMinutes){
        if (totalMinutes == null) return new DurationDTO(0,0);
        return new DurationDTO(totalMinutes / 60, totalMinutes % 60);
    }
}
