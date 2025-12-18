package com.datachef.datachef.dto.recipe;

public record DurationDTO(
        Integer minutes,
        Integer hours
) {
    public DurationDTO durationFromMinute(Short totalMinutes){
        return new DurationDTO(totalMinutes/60, totalMinutes%60);
    }
}
