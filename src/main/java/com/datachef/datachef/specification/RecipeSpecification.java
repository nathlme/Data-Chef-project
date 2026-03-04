package com.datachef.datachef.specification;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.model.Recipe;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class RecipeSpecification {

    public static Specification<Recipe> hasName(String query) {
        return (root, cq, cb) -> query == null ? null :
                cb.like(cb.lower(root.get("name")), "%" + query.toLowerCase() + "%");
    }

    public static Specification<Recipe> hasDifficulty(Difficulty difficulty) {
        return (root, cq, cb) -> difficulty == null ? null :
                cb.equal(root.get("difficulty"), difficulty);
    }

    public static Specification<Recipe> hasTags(List<String> tags) {
        return (root, cq, cb) -> tags == null ? null :
                root.get("tags").in(tags);
    }
}
