package com.datachef.datachef.dto.recipe;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Représentation d'une durée en heures et minutes")
public record DurationDTO(

        @Schema(description = "Minutes (0-59)", example = "30")
        short minutes,

        @Schema(description = "Heures", example = "1")
        short hours

) {
    public static DurationDTO durationFromMinute(Short totalMinutes) {
        if (totalMinutes == null) return new DurationDTO((short) 0, (short) 0);
        return new DurationDTO((short) (totalMinutes / 60), (short) (totalMinutes % 60));
    }

    public static Short minuteFromDuration(DurationDTO duration) {
        if (duration == null) return 0;
        int time = duration.minutes() + duration.hours() * 60;
        return (short) time;
    }
}