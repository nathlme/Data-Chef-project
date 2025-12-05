package com.datachef.datachef.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecipeInstruction {

    @JsonProperty("step")
    private Integer step;

    @JsonProperty("description")
    private String description;

    @JsonProperty("duration_minutes")
    private Integer durationMinutes;

    @JsonProperty("image_url")
    private String imageUrl;
}